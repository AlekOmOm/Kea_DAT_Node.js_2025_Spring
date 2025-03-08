// public/assets/js/matches.js
//
// fetch matches from api and render it in <main> tag at id dog-matches-name and dog-matches-breed dog-matches-image

document.addEventListener('DOMContentLoaded', function() {

    let dogs = []

    const dogMatchesNameH1 = document.getElementById('dog-matches-name')
    const dogMatchesBreedH2 = document.getElementById('dog-matches-breed')
    const dogMatchesImage = document.getElementById('dog-matches-image')
    const dogMatchesImageContainerDiv = document.getElementById('dog-matches-image-container')

    function getMatches() {
        const promises = fetch('/api/matches')
            .then(response => response.json())
            .then(result => {
                dogs = result.data
                createMatchImage(dogs.pop())
            })



        console.log(dogs)
    }

    function createMatchImage(dog) {
        if (!dog) {
            console.log('no dogs')
            return
        }

        dogMatchesNameH1.textContent = dog.name 

        const imageTag = document.createElement('img')
        imageTag.src = dog.image
        imageTag.id = 'dog-matches-image'
        imageTag.alt = dog.name 

        dogMatchesImageContainerDiv.innerHTML = ''
        dogMatchesImageContainerDiv.appendChild(imageTag)

        console.log(dog)
    }

    getMatches()
})





/*


DOM.renderMatches = function() {
    matches = []
    const fetched = fetch('localhost:3000/api/matches')
        .then(response => response.json())

    console.log(fetched)


}

DOM.renderMatches()

*/
