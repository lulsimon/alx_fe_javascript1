 Dynamic Quote Generator with Persistence

 Project Overview
This project is a dynamic, single-page web application (SPA) built using Vanilla JavaScript, demonstrating advanced frontend engineering techniques. It functions as an interactive Quote Generator that persists data across sessions and allows users to manage content via filtering and JSON operations.

This project specifically addresses the concepts of:
Advanced DOM Manipulation
Web Storage (Local & Session)
JSON Data Import/Export
Dynamic Content Filtering

 Key Features
Feature | Implementation Details

Quote Generation, Dynamically creates and updates quote and category elements on button click.
Data Persistence Uses Local Storag to save all quotes, ensuring data is available even after the browser is closed. 
User Input A form allows users to add new quotes and categories, which are immediately reflected and saved. 
Category FilteringA dynamic `<select>` dropdown populated from unique quote categories is used to filter displayed content. 
Data Management Functionality to **Import** quotes from a JSON file and **Export** the current quote array to a downloadable JSON file. 
Server Sync (Task 3)  [If you completed Task 3, modify this bullet point, Includes logic to simulate periodic data synchronization with a mock server and implement a basic conflict resolution strategy. |

 Technologies Used
 Technology | Why It Was Used 

HTML5 Basic structure and placeholders for dynamic content. 
CSS3 Simple styling (Optional, but helps presentation). 
Vanilla JavaScript Core logic for all DOM manipulation, events, web storage, and JSON parsing. 
Local Storage To permanently persist the main quotes array. 
Session Storage To temporarily store session-specific data (e.g., the last viewed quote). 

How to Run (Setup)
1. Clone the repository:
    bash
    git clone [https://github.com/YOUR_USERNAME/alx_fe_javascript.git](https://github.com/YOUR_USERNAME/alx_fe_javascript.git)
   
2.  Navigate to the project directory:
    bash
    cd alx_fe_javascript/dom-manipulation
    
3.  Open the file:
     Simply open the `index.html` file in your preferred web browser (e.g., double-click it, or right-click and select "Open with...").




