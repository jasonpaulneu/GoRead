// // background.js

// // const tabId = getTabId();

// // chrome.scripting.executeScript({
// //   target: {
// //     tabId: tab.id
// //   },
// //   func: translateFunction,
// // });

// async function getCurrentTab() {
//   let queryOptions = { active: true, lastFocusedWindow: true };
//   // `tab` will either be a `tabs.Tab` instance or `undefined`.
//   let [tab] = await chrome.tabs.query(queryOptions);
//   console.log("tab",tab)
//   return tab;
// }

// async function translateFunction() {

//   console.log("I am going to start translating the content on this page!");

//   // picking the p tags on the page

//   let domElems = document.getElementsByTagName("p");


//   // we have an array that stores all the random words selected on the page,
//   // we can split it based on the frequency count to decide which p Tag it relates to
//   let randomWords = [];

//   // We try to modify words in all the ptags that we find on the page
//   for (let i = 0; i < domElems.length; i++) {
//     // here we are iterating through the pTag elements

//     // getting the element
//     let elem = domElems.item(i);

//     // getting the text from the elem
//     let textContent = elem.innerText;

//     // selecting n random words form the text and updating the randomWords array
//     randomWords.push(...getRandomWords(textContent));

//   }

//   // Now we have the random words that we are going to translate
//   // console.log(randomWords);

//   // once we have the words we send this to the function that does the API call and get's us the translated data

//   let translatedWords = await getTranslations(randomWords);


//   console.log("Translated words");
//   console.log(translatedWords);

//   async function getTranslations(arrayOfwords) {

//     let result;

//     let payload = [];
//     const regex = /^\w+$/;
//     for (let i = 0; i < arrayOfwords.length; i++) {
//       if (arrayOfwords[i].match(regex)) {
//         let word = {
//           from: "en",
//           to: "es",
//           text: arrayOfwords[i]
//         };
//         payload.push(word)
//       }
//     }
//     const options = {
//       method: 'POST',
//       headers: {
//         'content-type': 'application/json',
//         'X-RapidAPI-Key': '42b6a75bb4msh1b364f0596aa097p181638jsn7302cb989899',
//         'X-RapidAPI-Host': 'translo.p.rapidapi.com'
//       },
//       body: JSON.stringify(payload)
//     };
//     let output = []
//     await fetch('https://translo.p.rapidapi.com/api/v3/batch_translate', options)
//       .then(response => response.json())
//       .then(response => {
//         let result = response.batch_translations
//         for (let i = 0; i < result.length; i++) {
//           output.push(result[i].text)
//         }

//       })
//       .catch(err => console.error(err));

//     return output
//   }

//   /**
//    * This function takes in a string and returns an array of string
//    * @param {String} text 
//    */
//   function getRandomWords(text) {

//     // we set the number of words that we wanna translate in a sentence
//     let x = 3;

//     // let's get the x random words from this sentence
//     let arr = [];

//     for (let i = 0; i < x; i++) {
//       arr.push(text.split(" ")[Math.floor(Math.random() * text.split(" ").length)]);
//     }

//     return arr;
//   }
// }


// const injectScript= async ()=>{
//   let tab = await getCurrentTab();
 
//   chrome.scripting.executeScript({
//     target: {
//       tabId: tab.id
//     },
//     func: translateFunction,
//   });

// }

// chrome.browserAction.onClicked.addListener(function (tab) {
// 	// for the current tab, inject the "inject.js" file & execute it
// 	chrome.tabs.executeScript(tab.ib, {
// 		file: 'inject.js'
// 	});
// });

// window.onload=function(){
//   console.log("page load!");
// }

// chrome.tabs.executeScript(
//   console.log("fhuseff")
// )

// // injectScript();
