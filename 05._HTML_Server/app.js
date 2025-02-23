const express = require('express');
const app = express();

// routes
    // url: localhost:8080/ 

let visitorCount = 0;

app.get('/', (req, res) => {
    console.log("GET request received at /");


    // file url: ./public/frontpage.html
    res.sendFile(__dirname + "./public/frontpage.html");

});


// task create route /visitorcounts that returns the visitor count

app.get('/visitorscounts', (req, res) => {
    
    visitorCount ++;

    res.send({ data: visitorCount })
})




// port and listen at end of file, 
    // since we want to make sure all routes are defined first
const PORT = 8080;
app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); })

