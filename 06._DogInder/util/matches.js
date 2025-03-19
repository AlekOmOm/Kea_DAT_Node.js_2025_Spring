<<<<<<< HEAD
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



=======
import { fakerEN_IN } from "@faker-js/faker";

export async function getMatches(numberOfMatches = 5) {
    const promises = [];
    for (let i = 0; i < numberOfMatches; i++) {
        const promise = fetch("https://dog.ceo/api/breeds/image/random")
        .then((response) => response.json());
        promises.push(promise);
    }
    const results = await Promise.all(promises);
    const matches = results.map((result) => ({ image: result.message, ...getIndianProfile() }))
    return matches;
}

function getIndianProfile() {
    return {
        name: fakerEN_IN.person.fullName(),
        bio: fakerEN_IN.person.bio(),
        streetAddress: fakerEN_IN.location.streetAddress(),
        city: fakerEN_IN.location.city()
    };
}


>>>>>>> 5e87b53309de6f61fe46bf2ba52e8d9d08f13542
