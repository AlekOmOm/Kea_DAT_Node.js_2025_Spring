const express = require('express');
const app = express();

app.use(express.json());


        // endpoint
// route / get handler
app.get("/", (req, res) => {
    res.send(`
            <h1>This is the root route</h1>
            <h3>Welcome</h3>
        `);
});


app.get("/welcomepage", (req, res) => {
    res.sendFile(__dirname + '/index.html');
}); 

app.get("/blablabla", (req, res) => {
    res.send({ data: "Bla bla bla is all I have to say" });
});

// assignment create a route for /search that returns an empty JSON
// task create a search where the query parameter is q that contains the search
app.get("/search", (req, res) => {
    res.send({ data: `You searched for: ${req.query.q}`});
});


const functionReference = (req, res) => {
    res.send({ data: `Your favorite number is: ${req.params.favoriteNumber}` });
};

app.get("/yourfavoritenumber/:favoriteNumber", functionReference);

app.get("/favoritethings/:favoriteFlower/:favoriteAnimal", (req, res) => {
    res.send({ data: `Your favorite flower is ${req.params.favoriteFlower} and your favorite animal is ${req.params.favoriteAnimal}` });
});

app.get("/redirecttofavoritethings", (req, res) => {
    res.redirect("/favoritethings/tulips/sea lions");
});


app.get("/proxy", (req, res) => {
    fetch("https://www.google.com")
    .then((response) => response.text())
    .then((result) => res.send(result));
    // fetch("https://google.com")
    // .then((response) => response.arrayBuffer())
    // .then((buffer) => {
    //     const decoder = new TextDecoder('iso-8859-1');
    //     const text = decoder.decode(buffer);
    //     res.send(text);
    // });
});


app.post("/favoritepoliticians", (req, res) => {

    console.log(req.body);

    res.send({ data: req.body });
});



<<<<<<< HEAD
// 28-02 modifications:

app.get("/redirecttofavoritethings", (req, res) => {
    res.redirect("/favoritethings/rose/dog");
})


// -------------------------------------------
// ------ 07-03 modifications:
//
// proxy server 

/*
 * Assignment: create a /proxy endpoint that calls the google homepage and returns the page to the client
 */

// require https 



app.get("/google-proxy", (req, res) => {
    
    fetch('https://www.google.com')
        .then(response => response.text())
        .then(data => {
            res.send(data);
        });
    
    // steps of this function:
    // 1. fetch the google homepage
    // 2. get the response in text format (html)
    // 3. send the response to the client (browser)

});


app.get("/google-proxy-https", (req, res) => {

    const https = require('https');
    const options = {
        hostname: 'www.google.com',
        port: 443,
    };

    const request = https.request(options, response => {
        let data = '';

        response.on('data', chunk => {
            data += chunk;
        });

        response.on('end', () => {
            res.send(data);
        });
    });

    request.on('error', error => {
        console.error(error);
    });

    request.end();

    // steps of this function:
    // 1. setup consts for https and options (hostname, port)
    // 2. create a request to the google homepage
    // 3. get response
    //      - in chunks and append them to the data variable
    // 4. when response end, then send the data to the client (browser)

});


=======


/* assignment
create a /proxy endpoint that calls the google homepage and returns the page to the client
*/
>>>>>>> 5e87b53309de6f61fe46bf2ba52e8d9d08f13542


app.listen(8080);
