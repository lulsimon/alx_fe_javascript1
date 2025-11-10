// Global array to hold all quotes
let quotes = [];
// Key for Local Storage
const STORAGE_KEY = 'quotesData';
// Key for Session Storage (Task 1 optional)
const LAST_VIEWED_KEY = 'lastViewedQuote';

// --- Task 1: Web Storage Functions ---

/**
 * Loads quotes from Local Storage on application startup.
 */
function loadQuotes() {
    const storedQuotes = localStorage.getItem(STORAGE_KEY);
    if (storedQuotes) {
        // Parse the JSON string back into an array
        quotes = JSON.parse(storedQuotes);
        console.log('Quotes loaded from Local Storage:', quotes.length);
    } else {
        // Default quotes if storage is empty
        quotes = [
            { text: "The only way to do great work is to love what you do.", category: "Work" },
            { text: "Strive not to be a success, but rather to be of value.", category: "Inspiration" },
            { text: "Life is what happens when you're busy making other plans.", category: "Life" }
        ];
        console.log('No quotes found, using default data.');
        saveQuotes(); // Save defaults immediately
    }
}

/**
 * Saves the current 'quotes' array to Local Storage.
 */
function saveQuotes() {
    // Stringify the array for storage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(quotes));
    console.log('Quotes saved to Local Storage.');
    // Re-populate categories whenever quotes change
    populateCategories();
}

/**
 * Saves the last displayed quote to Session Storage (optional Task 1).
 * @param {object} quote - The quote object to save.
 */
function saveLastViewedQuote(quote) {
    sessionStorage.setItem(LAST_VIEWED_KEY, JSON.stringify(quote));
}

// --- Task 0: DOM Manipulation and Content Generation ---

/**
 * Displays a random quote from the current quotes array.
 */
function showRandomQuote() {
    if (quotes.length === 0) {
        document.getElementById('quoteDisplay').innerHTML = '<p>No quotes available. Add one!</p>';
        return;
    }

    // Get the currently selected filter category
    const selectedCategory = document.getElementById('categoryFilter').value;
    
    // Filter quotes based on the selected category
    const filteredQuotes = selectedCategory === 'all' 
        ? quotes 
        : quotes.filter(q => q.category.toLowerCase() === selectedCategory.toLowerCase());

    if (filteredQuotes.length === 0) {
        document.getElementById('quoteDisplay').innerHTML = `<p>No quotes found in the category: <strong>${selectedCategory}</strong>.</p>`;
        return;
    }

    // Generate a random index
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const quote = filteredQuotes[randomIndex];
    
    // Advanced DOM Manipulation: Create elements dynamically
    const displayDiv = document.getElementById('quoteDisplay');
    displayDiv.innerHTML = ''; // Clear previous content

    const quoteText = document.createElement('p');
    quoteText.className = 'quote-text';
    quoteText.textContent = `"${quote.text}"`;

    const quoteCategory = document.createElement('span');
    quoteCategory.className = 'quote-category';
    quoteCategory.textContent = `Category: ${quote.category}`;

    // Append the new elements
    displayDiv.appendChild(quoteText);
    displayDiv.appendChild(quoteCategory);

    // Task 1: Save the displayed quote to session storage
    saveLastViewedQuote(quote);
}

/**
 * Adds a new quote from the form input to the quotes array.
 */
function addQuote() {
    const quoteTextElement = document.getElementById('newQuoteText');
    const quoteCategoryElement = document.getElementById('newQuoteCategory');

    const text = quoteTextElement.value.trim();
    const category = quoteCategoryElement.value.trim();

    if (text && category) {
        const newQuote = { text: text, category: category };
        quotes.push(newQuote);

        // Task 1: Save the updated array to Local Storage
        saveQuotes(); 

        // Clear the form fields
        quoteTextElement.value = '';
        quoteCategoryElement.value = '';

        alert('Quote added successfully!');
        // Update category filter dropdown
        populateCategories();
    } else {
        alert('Please enter both a quote and a category.');
    }
}

// --- Task 2: Dynamic Content Filtering ---

/**
 * Extracts unique categories and populates the filter dropdown.
 */
function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    // Clear all existing options except the "All Categories" one
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';

    // Get unique categories from the quotes array
    const uniqueCategories = [...new Set(quotes.map(q => q.category))];

    // Populate the dropdown dynamically
    uniqueCategories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    // Task 2: Restore the last selected filter from Local Storage
    const lastFilter = localStorage.getItem('lastCategoryFilter');
    if (lastFilter) {
        categoryFilter.value = lastFilter;
    }
}

/**
 * Filters the displayed quotes based on the selected category.
 * This function also saves the selected filter to Local Storage.
 */
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    
    // Save the selected filter to Local Storage
    localStorage.setItem('lastCategoryFilter', selectedCategory);

    // Re-call showRandomQuote to display a random quote from the filtered list
    showRandomQuote();
    console.log(`Filter changed to: ${selectedCategory}. New random quote displayed.`);
}

// --- Task 1: JSON Import and Export ---

/**
 * Exports the current quotes array to a JSON file for download.
 * Uses Blob and URL.createObjectURL.
 */
function exportToJsonFile() {
    // Convert the quotes array to a JSON string
    const dataStr = JSON.stringify(quotes, null, 2); // null, 2 for pretty-printing

    // Create a Blob from the JSON string
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    // Create a temporary URL for the Blob
    const url = URL.createObjectURL(dataBlob);

    // Create a temporary anchor element for the download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes_export.json';
    
    // Programmatically click the link to trigger the download
    document.body.appendChild(a);
    a.click();

    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

/**
 * Imports quotes from a selected JSON file.
 * @param {Event} event - The file change event.
 */
function importFromJsonFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    const fileReader = new FileReader();

    fileReader.onload = function(e) {
        try {
            // Parse the imported JSON string
            const importedQuotes = JSON.parse(e.target.result);

            // Basic validation to ensure it's an array of objects
            if (Array.isArray(importedQuotes) && importedQuotes.every(q => q.text && q.category)) {
                // Add the imported quotes to the existing array
                quotes.push(...importedQuotes);
                // Save the combined array to Local Storage
                saveQuotes(); 
                alert(`Successfully imported ${importedQuotes.length} quotes!`);
                // Reset the file input to allow re-importing the same file
                event.target.value = '';
                // Update the categories in the filter
                populateCategories();
            } else {
                alert('Import failed: JSON format is invalid. Expected an array of quote objects with "text" and "category".');
            }
        } catch (error) {
            console.error('Error parsing JSON:', error);
            alert('Error processing file. Please ensure it is a valid JSON format.');
        }
    };

    // Read the file content as text
    fileReader.readAsText(file);
}

// --- Initialization ---

// 1. Event listener for the "Show New Quote" button (Task 0)
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// 2. Initial setup function called when the script loads
function initialize() {
    loadQuotes(); // Task 1: Load data from Local Storage
    populateCategories(); // Task 2: Populate the filter dropdown
    filterQuotes(); // Task 2: Display a quote based on the last filter (or default 'all')
}

// Run the initialization
initialize();