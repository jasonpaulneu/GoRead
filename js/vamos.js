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

  // picking the p tags on the page

  let domElems = document.getElementsByTagName("p");


  // we have an array that stores all the random words selected on the page,
  // we can split it based on the frequency count to decide which p Tag it relates to
  let randomWords = [];

  // We try to modify words in all the ptags that we find on the page
  for (let i = 0; i < domElems.length; i++) {
    // here we are iterating through the pTag elements

    // getting the element
    let elem = domElems.item(i);

    // getting the text from the elem
    let textContent = elem.innerText;

    // selecting n random words form the text and updating the randomWords array
    randomWords.push(...getRandomWords(textContent));

  }

  // Now we have the random words that we are going to translate

  console.log(randomWords);



  /**
 * This function takes in a string and returns an array of string
 * @param {String} text 
 */
  function getRandomWords(text) {

    // we set the number of words that we wanna translate in a sentence
    let x = 3;

    // let's get the x random words from this sentence
    let arr = [];

    for (let i = 0; i < x; i++) {
      arr.push(text.split(" ")[Math.floor(Math.random() * text.split(" ").length)]);
    }

    return arr;



  }
}


