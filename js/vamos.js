// Initialize button for translation
let translateButton = document.getElementById("translate");



/**
 * SAMPLE CODE FOR UNDERSTANDING HOW TO MANIPULATE DOM 
 *  
*/ 

// When the button is clicked, inject the translate function into current page
translateButton.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: translateFunction,
    });
  });
  
  // The body of this function will be executed as a content script inside the
  // current page
  function translateFunction() {
    console.log("I am going to start translating the content on this page!");
  }