
import express from 'express';
import path from 'path';
import { getMatches } from './util/matches.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.static('public'));

const PUBLIC_PATH = path.resolve('public');

const PORT = process.env.PORT;

/* ------------------  ------------------ */

app.get('/', (req, res) => {
    res.sendFile(path.resolve(PUBLIC_PATH+'/frontpage/frontpage.html'));
});

app.get('/matches', (req, res) => {
    res.sendFile(path.resolve(PUBLIC_PATH+'/matches/matches.html'));
});


    // async since
app.get('/api/matches', async (req, res) => {

    const matches = await getMatches();

    res.json(matches);

});


// await is used with fetch, since fetch returns a promise (async function)
// fetch is used to get data from the server












    /* ------------------  ------------------ */
app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});
