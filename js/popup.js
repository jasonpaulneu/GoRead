/**
 * Things to do
 * 1. Set language
 * 2. Set number of words
 * 3. Set difficulty
 */

//get selected language and set it as a value for the selected input
chrome.storage.sync.get(['selectedLanguage'], (result) => {
  let selectedLanguageElement = document.getElementById("language-select");
  selectedLanguageElement.value=result.selectedLanguage;
});

//event listener function for selectElement
const selectLanguageOnChange = () =>{
  let selectedLanguage = document.getElementById("language-select").value;
  chrome.storage.sync.set({selectedLanguage:selectedLanguage});
}

//add event listener to select element
let selectedLanguageElement = document.getElementById("language-select");
selectedLanguageElement.addEventListener('change',selectLanguageOnChange);

//get number of words
chrome.storage.sync.get(['numberOfWords'],(result)=>{
  let wordCountElement = document.getElementsByClassName("words-count")[0];
  console.log("result",result);
  wordCountElement.innerText= result.numberOfWords ? result.numberOfWords : 0;
})


// // Initialize button with user's preferred color
// let changeColor = document.getElementById("changeColor");

// chrome.storage.sync.get("color", ({ color }) => {
//   changeColor.style.backgroundColor = color;
// });

// /**
//  * SAMPLE CODE FOR UNDERSTANDING HOW TO MANIPULATE DOM 
//  *  
// */ 

// // When the button is clicked, inject setPageBackgroundColor into current page
// changeColor.addEventListener("click", async () => {
//     let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

//     console.log(chrome);
//     chrome.scripting.executeScript({
//       target: { tabId: tab.id },
//       func: setPageBackgroundColor,
//     });
//   });
  
//   // The body of this function will be executed as a content script inside the
//   // current page
//   function setPageBackgroundColor() {
//     chrome.storage.sync.get("color", ({ color }) => {
//       document.body.style.backgroundColor = color;
//     });
//   }