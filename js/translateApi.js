
// async function getTranslations(arrayOfwords){

//     let result;

//     let payload = [];
//     const regex = /^\w+$/;
//     for (let i = 0; i < arrayOfwords.length; i++) { 
//         if(arrayOfwords[i].match(regex)){
//           let word = {from :"en", to:"es", text:arrayOfwords[i]};
//           payload.push(word)
//         }
//     }
// <<<<<<< Updated upstream
//     // console.log(textBody)
// =======
// >>>>>>> Stashed changes
//     const options = {
//         method: 'POST',
//         headers: {
//             'content-type': 'application/json',
//             'X-RapidAPI-Key': '42b6a75bb4msh1b364f0596aa097p181638jsn7302cb989899',
//             'X-RapidAPI-Host': 'translo.p.rapidapi.com'
//         },
//         body: JSON.stringify(payload)
//     };
//     let output =[]
//     await fetch( 'https://translo.p.rapidapi.com/api/v3/batch_translate', options)
// 	.then(response => response.json())
// <<<<<<< Updated upstream
// 	.then((response) => {
//         // console.log(response)
//         result = response
// =======
// 	.then(response => {
//         let result = response.batch_translations
//         for (let i=0; i<result.length; i++){
//             output.push(result[i].text)
//         }
    
// >>>>>>> Stashed changes
//     })
// 	.catch(err => console.error(err));
    
//     return output
// }


// module.exports={
//     getTranslations
// }