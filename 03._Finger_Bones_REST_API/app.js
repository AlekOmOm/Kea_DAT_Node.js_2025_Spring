

express = require('express') // require is importing in Express 
const app = express() // creating a new instance of Express

app.use(express.json())  // app.use makes the middleware available to all routes
    // express = library
    // .json = util method of express library 
        // used for parsing JSON bodies

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

// GET (route / get handler)
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


// Assignment: create a route for /search that returns an empty JSON

// GET search

app.get('/search', (req, res) => {
    // console.log(req.params)
    // console.log(req)
    console.log(req.query.q)
    res.send({ data: `You searched for: ${req.query.q}`})
}) 
// example search: http://localhost:8080/search?name=Phalange%20Knowles
            
    // url anatomy:
        // http = protocol
        // localhost = domain
        // 8080 = port
        // /search = route / HTTP handler
        // ?name=Phalange%20Knowles = query string
            // name = query parameter
            // Phalange%20Knowles = query value
                

// ----------------
    // best way to print out the query is to console.log(req.query)

// ----------------
// note:
    // req.query is an (JSON) object that contains a property for each query string parameter in the route (JSON object)
        // /<query-name>=<value> is the query string parameter fx /name=Phalange%20Knowles
        // req.query.<query-name> is the value of the query string parameter <query-name>
            // -> returns the value of the query string parameter <query-name> as a string
                // fx. req.query.q is the value of the query string parameter q

// ----------------
// note query string vs path variables
    // query strings are optional and can be added to the end of the URL
    // path variables are required and are part of the URL path

// note on URL encoding


// POST 
// body parsing:

app.post('/favouritepoliticians', (req, res) => {

    console.log(req.body) 
    // req.body is an object that contains the data sent in the request body
        // req.body is only available if the body-parser middleware is used
        // body-parser is a middleware that parses the request body and makes it available in the req.body object

    // req.body undefined because body-parser middleware is not used
        // to use body-parser, you need to install it and require it in your app
        // npm install body-parser (date 2021-09-07)
        // const bodyParser = require('body-parser')

    res.send({ data: req.body})
})

// ----------------
// Assignment: 
    // create a new route and send some data to it through the body

// POST /npmCoolDependencies
const npmCoolDependencies = [{
    "name": "express",
    "version": "4.17.1"
}]
app.post('/npmCoolDependencies', (req, res) => {
    console.log(req.body)

    npmCoolDependencies.push(req.body)

    res.send({ data: req.body })
})

console.log(`npm cool dependencies:  ${JSON.stringify(npmCoolDependencies)}`) // updated with new data from POST request


// ---------------- HTML in HTTP Responses

app.get('/welcomepage', (req, res) => {
    // res.sendFile('C:\Users\HP\OneDrive\. Universitet\. Github\. electives\Full-Stack NodeJS\01_Course_and_Exercises\Kea_DAT_Node.js_2025_Spring\03._Finger_Bones_REST_API\index.html')
    
    // correct:
    res.sendFile(__dirname + '/index.html')
        // benefits with __dirname:(dunder dirname)
            // __dirname is a global variable that contains the path to the current file
            // thus, independent of:
                // OS + User + File Structure 
                // -> all team and users can run the code without changing the path

})



app.get("/fingerbones", (req, res) => {
    res.send({ data: fingerBones });
});

app.get("/fingerbones/:id", (req, res) => {
    const fingerBoneId = Number(req.params.id);
    const foundFingerBones = fingerBones.find((fingerBone) => fingerBone.id === fingerBoneId);

    if (!foundFingerBones) {
        res.status(404).send({ error: `No finger bones found with id ${fingerBoneId}` });
    } else {
        res.send({ data: foundFingerBones });
    }
});


