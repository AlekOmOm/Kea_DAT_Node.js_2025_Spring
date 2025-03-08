// util/match.js

const dogCeoAPI = 'https://dog.ceo/api/breeds/image/random'

export async function getMatches(numberOfMatches = 2) {
    const promises = [];

    for(let i = 0; i < numberOfMatches; i++) {
        const promise = getMatch();

        promises.push(promise);

        console.log(promise);
    }

    const results = await Promise.all(promises);

    const matches = results.map((result) => ({ 
        image: result.message,
        name: 'Dog Name',

    }));
    return matches;
}


async function getMatch() {

    return await fetch(dogCeoAPI)
        .then((response) => response.json())
}



