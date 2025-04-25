import db from './connection.js';

const deleteMode = false;

if (deleteMode) {
    db.exec('DROP TABLE IF EXISTS games');
    db.exec('DROP TABLE IF EXISTS runtime_environments');
}

db.exec(`CREATE TABLE runtime_environments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    platform TEXT,
    version TEXT
);
`);

db.exec(
    `CREATE TABLE games (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    short_description VARCHAR(500),
    genre TEXT CHECK( genre IN ('MMO', 'RPG', 'FPS') ),
    runtime_environment_id INTEGER,
    FOREIGN KEY (runtime_environment_id) REFERENCES runtime_environments (id)
);
`);
