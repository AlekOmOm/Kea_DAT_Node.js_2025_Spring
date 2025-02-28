
// using now:
    /* 
     * type: module
     * dependencies: express
     *
     * import (from module) 
     *   - import allows to import modules from other files (benefit from require: it's hoisted)
     *   -> no __dirname, __filename 
     *
     * path 
     *   - path allows to work with file paths
     *      - path.resolve() returns the absolute path 
     *
     */

// previous: 
    /* 
     * require (from module)
     *   - require allows to import modules from other files
     *   -> __dirname, __filename 
     * 
     * path 
     *   - path allows to work with file paths
     *      - path.resolve() returns the absolute path 
     *
     */


import express from 'express';

import path from 'path';

import partiesLibraryESModules from './util/partiesLibraryES.js';



const app = express();

app.use(express.static("public"));

let visitorsCount = 123440;

app.get("/", (req, res) => {
    res.sendFile(path.resolve("public/frontpage/frontpage.html"));
});

app.get("/visitorscounts", (req, res) => {
    res.send({ data: ++visitorsCount });
});


app.get("/partypage", (req, res) => {
    res.sendFile(path.resolve("public/partypage/partPage.html"));
});



const PORT = 8080;
app.listen(PORT, () => console.log("Server is running on port", PORT));

