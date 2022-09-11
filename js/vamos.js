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
async function translateFunction() {

  // console.log("I am going to start translating the content on this page!");

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
  // console.log(randomWords);

  // once we have the words we send this to the function that does the API call and get's us the translated data

  // let translatedWords = await getTranslatedWords(randomWords); // actual function call
  let translatedWords = tempTranslate(randomWords); // actual function call




  //===============================

  /**
   * Now that we have translated the words, let's go ahead with replacing the words in the dom with the translated words
   */
  replaceDom(domElems, randomWords, translatedWords, 3);


  /**
   * This function access the dom elements and swaps the original words with the translated words
   * This also adds the tag to surround those elements so that we can add the required styling and the tooltip
   * @param {HtmlElement} domElements - the dom elements that have to be modified
   * @param {String} wordsToReplace - words that have to be replaed
   * @param {String} replacementWords - words that are translated
   * @param {Number} frequency - number of words to replace per paragrph tag
   */
  function replaceDom(domElements, wordsToReplace, replacementWords, frequency){
    
    /**
     * To replace the dom elements, we know that for every dom element we have 'frequency' number of replacements to make
     * and the words are present in the same order
     */
    // console.log("Ulle poichu");
    let count = 0;
    // we run a for loop for each dom element
    for(let i = 0; i < domElements.length; i++){
      let domElem = domElements.item(i);

      // slice function, start is inclusive, end is exclusive
      let targetWords = wordsToReplace.slice(count, count+frequency);
      

      let swapWords = replacementWords.slice(count, count+frequency);
      

      // for each target word identify the position of that in the pTags

      // now we have this dom element, that is most probably a paragraph tag
      
      // we run a for loop and replace the 3 random words with the new word that we selected
      
      for(let i = 0 ; i < targetWords.length; i++){
        let targetWord = targetWords[i];
        let replacement = swapWords[i];




        // now we filter through the p tag and get that text tag and see if this p tag has any text 
        // that can be highlighted

        for(let j = 0; j < domElem.childElementCount; j++){

          let el = domElem.childNodes[j];


          if(el.nodeType === 3){
            
            // check if this element contains that word
            let value = el.nodeValue;
            
            if(value.includes(targetWord)){

              // yes it contains, we replace that with a new span element
              let newSpan = document.createElement("span");

              // console.log(value);
              console.log(targetWord);
              console.log(replacement);
              value = value.replace(targetWord, `<span class="hoverElement">${replacement}</span>`);
              // console.log(value);
              newSpan.innerHTML = value;

              el.replaceWith(newSpan);
            }
          }
        }


      }

      count += 3;
    }

  }

  /**
   * This is a temp function that returns hard coded transated words
   * using this to proeed with other functionality
   * 
   * this takes in an array of words and returns the same array with the characters
   * "-tr" attached after each word
   * @param {String} stringArray 
   * @returns 
   */
  function tempTranslate(stringArray){

    return  stringArray.map(x => x=x+"-tr");
    
  }
  
  /**
   * This function takes in an array of string and triggers the API call to get the translated data
   * @param {String} arrayOfwords 
   */
  async function getTranslatedWords(arrayOfwords) {

    textBody = []
    for (let i = 0; i < arrayOfwords.length; i++) {
      word = { "Text": arrayOfwords[i] }
      textBody.push(word)
    }

    console.log("text body");
    console.log(textBody);
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': "", // put key here
        'X-RapidAPI-Host': "", // put key here
        "Access-Control-Allow-Origin": '*'
      },
      body: textBody
    };

    console.log("Doing fetch cal");
    fetch('https://microsoft-translator-text.p.rapidapi.com/translate?to%5B0%5D=es&api-version=3.0&profanityAction=NoAction&textType=plain', options)
      .then(response => response.json())
      .then((result) => {

        console.log(result);
        console.log("received output");
        output = []
        for (let i = 0; i < result.length; i++) {
          output.push(result[i].translations[0].text)
        }
    
        return output
      })
      .catch(err => console.error(err));


  }

  /**
 * This function takes in a string and returns an array of words that we want to translate
 * @param {String} text 
 */
  function getRandomWords(text) {

    // console.log(text);
    // we set the number of words that we wanna translate in a sentence
    let x = 3;

    // let's get the x random words from this sentence
    let arr = [];

    for (let i = 0; i < x; i++) {
      let splitArray= text.split(" ");
      let len = splitArray.length;
      // console.log(splitArray);
      // console.log(splitArray[Math.floor(Math.random() * len)]);
      arr.push(splitArray[Math.floor(Math.random() * len)]);
    }

    console.log(arr);


    return arr;
  }
}


