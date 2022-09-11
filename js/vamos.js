// Initialize button for translation
let translateButton = document.getElementById("translate");

/**
 * SAMPLE CODE FOR UNDERSTANDING HOW TO MANIPULATE DOM 
 *  
 */

// When the button is clicked, inject the translate function into current page
translateButton.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });

  chrome.scripting.executeScript({
    target: {
      tabId: tab.id
    },
    func: translateFunction
  });

  chrome.scripting.insertCSS({
    target: {
      tabId: tab.id
    },
    files: ['styles/button.css']
  })

});

// The body of this function will be executed as a content script inside the
// current page
async function translateFunction() {

  var bubbleDOM = document.createElement('div');
  bubbleDOM.setAttribute('class', 'selection_bubble');
  document.body.appendChild(bubbleDOM);

  // Lets listen to mouseup DOM events.
  document.addEventListener('mouseup', function (e) {
    //checking if e has a class translate-span
    if (e.target.classList.contains('translate-span')) {
      let translatedWord = e.target.innerText;
      let orgWord = e.target.getAttribute('data-orgword');
      if (translatedWord.length > 0) {
        renderBubble(e.pageX, e.pageY, translatedWord, orgWord);
      }
    }
  }, false);

  // Close the bubble when we click on the screen.
  document.addEventListener('mousedown', function (e) {
    bubbleDOM.style.visibility = 'hidden';
  }, false);

  function renderBubble(mouseX, mouseY, translatedWord, orgWord) {
    bubbleDOM.innerHTML = `<div class="popup-container">
    <div class="words">
        <div>
            ${orgWord}
        </div>
        <div class="hor-separator"> </div>
        <div>
            ${translatedWord}
        </div>
    </div>
</div>`;
    bubbleDOM.style.top = mouseY + 'px';
    bubbleDOM.style.left = mouseX + 'px';
    bubbleDOM.style.visibility = 'visible';
  }


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

   let translatedWords = await getTranslations(randomWords); // actual function call
  // let translatedWords = tempTranslate(randomWords); // actual function call

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
  async function replaceDom(domElements, wordsToReplace, replacementWords, frequency) {

    /**
     * To replace the dom elements, we know that for every dom element we have 'frequency' number of replacements to make
     * and the words are present in the same order
     */
    // console.log("Ulle poichu");
    let count = 0;
    // we run a for loop for each dom element
    for (let i = 0; i < domElements.length; i++) {
      let domElem = domElements.item(i);

      // console.log(domElem);

      // slice function, start is inclusive, end is exclusive
      let targetWords = wordsToReplace.slice(count, count + frequency);
      // console.log(targetWords);


      let swapWords = replacementWords.slice(count, count + frequency);
      // console.log(swapWords);

      // for each target word identify the position of that in the pTags

      // now we have this dom element, that is most probably a paragraph tag

      // we run a for loop and replace the 3 random words with the new word that we selected

      for (let i = 0; i < targetWords.length; i++) {
        let targetWord = targetWords[i];
        let replacement = swapWords[i];


        // now we filter through the p tag and get that text tag and see if this p tag has any text 
        // that can be highlighted

        for (let j = 0; j < domElem.childElementCount; j++) {

          let el = domElem.childNodes[j];


          if (el.nodeType === 3) {

            // check if this element contains that word
            let value = el.nodeValue;

            // check if any of the words in this value equals the target word
            let splitArray = value.split(" ");

            if (splitArray.some(x => x === targetWord)) {
              // we replace that word with the new word
              let index = splitArray.indexOf(targetWord);

              splitArray[index] = `<span style="background-color: #6dcee396;
              border: 1px solid #6dcee396;
              border-radius: 0.5em;
              padding: 0.4em;
              user-select: none;" class="translate-span" data-orgword="${targetWord}">${replacement}</span>`;

              value = splitArray.join(" ");

              // yes it contains, we replace that with a new span element
              let newSpan = document.createElement("span");
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
  function tempTranslate(stringArray) {

    return stringArray.map(x => x = x + "-tr");

  }

  /**
   * This function takes in an array of string and triggers the API call to get the translated data
   * @param {String} arrayOfwords 
   */
    async function getTranslations(arrayOfwords) {

      let result;

      let payload = [];
      const regex = /^\w+$/;
      for (let i = 0; i < arrayOfwords.length; i++) {
        if (arrayOfwords[i].match(regex)) {
          let word = {
            from: "en",
            to: "es",
            text: arrayOfwords[i]
          };
          payload.push(word)
        }
      }

      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': '42b6a75bb4msh1b364f0596aa097p181638jsn7302cb989899',
          'X-RapidAPI-Host': 'translo.p.rapidapi.com'
        },
        body: JSON.stringify(payload)
      };
      let output = []
      await fetch('https://translo.p.rapidapi.com/api/v3/batch_translate', options)
        .then(response => response.json())
        .then(response => {
          let result = response.batch_translations
          for (let i = 0; i < result.length; i++) {
            output.push(result[i].text)
          }
          return output
        })
        .catch(err => console.error(err));

      return output
    }

    /**
     * This function takes in a string and returns an array of string
     * @param {String} text 
     */

    function getRandomWords(text) {

      // console.log(text);
      // we set the number of words that we wanna translate in a sentence
      let x = 3;

      // let's get the x random words from this sentence
      let arr = [];

      for (let i = 0; i < x; i++) {
        let splitArray = text.split(" ");
        let len = splitArray.length;
        // console.log(splitArray);
        // console.log(splitArray[Math.floor(Math.random() * len)]);
        arr.push(splitArray[Math.floor(Math.random() * len)]);
      }
      return arr;
    }
}