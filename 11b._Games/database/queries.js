import seedData from './data.js'

// ----- DDL -----
const createTableGames = `
CREATE TABLE games (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    title TEXT NOT NULL, 
    short_description VARCHAR(500),
    genre TEXT CHECK( genre IN ('MMO', 'RPG', 'FPS') ),
    runtime_environments_id INTEGER, 
    FOREIGN KEY (runtime_environments_id) REFERENCES runtime_environments (id)
);
`;

const createTableRuntimeEnvironments = `
CREATE TABLE runtime_environments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    platform TEXT NOT NULL,
    version TEXT
);
`

// ----- DML -----

const insertGames = `INSERT INTO games (title, short_description, genre, runtime_environments_id) VALUES (?, ?, ?, ?)`;

const insertRuntimeEnvironments = `INSERT INTO runtime_environments (platform, version) VALUES (?, ?)`;


// ----- seed data -----
const insertMarioKartGame = `INSERT INTO games (title, short_description, genre, runtime_environments_id) VALUES ('Mario Kart', 'Mario Kart is a racing game series developed and published by Nintendo.', 'RPG', 1)`;

// ----- seed select -----

const selectAllGames = 'SELECT * FROM games';


// ----- export -----
export default {
    createTableGames,
    createTableRuntimeEnvironments,
    insertGames,
    insertRuntimeEnvironments,
    insertMarioKartGame,
    selectAllGames,
}

