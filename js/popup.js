/**
 * Things to do
 * 1. Set number of words
 */

//get selected language and set it as a value for the selected input
chrome.storage.sync.get(['selectedLanguage'], (result) => {
  let selectedLanguageElement = document.getElementById("language-select");
  selectedLanguageElement.value=result.selectedLanguage;
});

//event listener function for selectLanguageElement
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

//get selected difficulty 
chrome.storage.sync.get(['selectedDifficulty'], (result) => {
  let difficultyElement = document.getElementById("difficulty-select");
  difficultyElement.value=result.selectedDifficulty;
});

//event listener function for range selection
const difficultyOnChange = () =>{
  let selectedDifficulty = document.getElementById("difficulty-select").value;
  chrome.storage.sync.set({selectedDifficulty:selectedDifficulty});
}
