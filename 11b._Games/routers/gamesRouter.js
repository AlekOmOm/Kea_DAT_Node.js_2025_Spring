import Router from 'express';


const router = Router();

// ------- middleware -------

import queries from '../database/queries.js';
import db from '../database/connection.js';



// ------- routes -------
router.get('/', async (req, res) => {
    try {
        const games = await db.get(queries.selectAllGames);
        res.send({ data: games });

    } catch (error) {
        console.error('Error fetching games:', error);
        res.status(500).send('Internal Server Error');
    }
});


router.post('/', async (req, res) => {
    
    if (!req.body.title) {
        return res.status(400).send('Title is required');
    }
    
    await db.run(queries.insertGames, [req.body.title, req.body.shortDescription, req.body.genre, req.body.runtimeEnvironmentId]);

    console.log('Game inserted:', req.body.title);

    // print games 
    const games = await db.get(queries.selectAllGames);
    console.log('Games:', games);

    const newGame = req.body;
    res.status(201).send(`Game created: ${JSON.stringify(newGame)}`);
});

`
{
    "title": "Game Title",
    "shortDescription": "Short description of the game",
    "genre": "RPG",
    "runtimeEnvironmentId": 1
}
`







router.get('/resetDB', async (req, res) => {
    try {

        res.status(200).send('Database reset initiated');
    } catch (error) {
        console.error('Error resetting database:', error);
        res.status(500).send('Internal Server Error');
    }
});


// ------ export ------
export default router;
