
export function getTranslations(arrayOfwords){

    var result;

    textBody = []
    for (let i = 0; i < arrayOfwords.length; i++) { 
       word = {"Text":arrayOfwords[i]}
       textBody.push(word)
    }
    // console.log(textBody)
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': process.env.API_KEY,
            'X-RapidAPI-Host': process.env.API_HOSY
        },
        body: arrayOfwords
    };

    fetch('https://microsoft-translator-text.p.rapidapi.com/translate?to%5B0%5D=es&api-version=3.0&profanityAction=NoAction&textType=plain', options)
	.then(response => response.json())
	.then((response) => {
        // console.log(response)
        result = response
    })
	.catch(err => console.error(err));

    output =[]
    for (let i=0; i<result.length; i++){
        output.push(result[i].translations[0].text)
    }

    return output
}


