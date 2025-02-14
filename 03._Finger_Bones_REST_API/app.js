
express = require('express') // require is importing in Express 
const app = express() // creating a new instance of Express

const BASE_URL = "/fingerbones"
const PORT = 8080

// body objects

const fingerBones = [
    {
        id: 1,
        name: "Phalange Knowles",
    },
    {
        id: 2,
        name: "Distal Phalange",
    }
]

app.listen(PORT, () => {
   console.log("Server running on port: 8080")
})

// -------------

// GET
app.get(BASE_URL, (req, res) => {
    res.send("Welcome to the Finger Bones API 🦴"+"<br>"+JSON.stringify(fingerBones))
})

// GET by ID
app.get(BASE_URL + '/:id', (req, res) => {
    
    const fingerBone = fingerBones.find( // if id not in array, will return undefined > return empty json object
        (fingerBone) => fingerBone.id === parseInt(req.params.id)
    )

    if (!fingerBone) {  // security defaults | fail safe guards
        return res.status(404).send({ error: "Finger Bone not found" })
    }

    res.send({ data: fingerBone })
}) 

// ----------------
// note on solution code: 
    // res.send({ data: fingerBone }) is the same as res.json(fingerBone) 
    // req.params.id is a string, so you need to parseInt(req.params.id) to convert it to a number

// ----------------
// note on Status Codes:
    // 2xx - Success 
        // 200 - OK
    // 3xx - Redirection
    // 4xx - Client Error
        // 404 - Not Found
    // 5xx - Server Error
        // 500 - Internal Server Error


// ----------------
// note on parseInt:
    
// ----------------
// Note: index and id are the same value
    // best practice for id and index: 
        // const index = fingerBones.findIndex(fingerBone => fingerBone.id === parseInt(req.params.id))


// POST 
app.post(BASE_URL, (req, res) => {

})
