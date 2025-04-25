import db from './connection.js';
import queries from './queries.js';


// Delete mode
process.argv.includes('--delete') && console.log('Deleting tables...');

const deleteMode = process.argv.includes('--delete');

if (deleteMode) {
    db.exec('DROP TABLE IF EXISTS games');
    db.exec('DROP TABLE IF EXISTS runtime_environments');
}

// DDL
await db.exec(queries.createTableRuntimeEnvironments);
await db.exec(queries.createTableGames);



// DML

// -- seeding --

if (deleteMode) {
    console.log('Seeding tables...');
    
    await db.run(queries.insertMarioKartGame);
}


// ------ print out ------

await db.get(queries.selectAllGames)
    .then((games) => {
        console.log('Mario Kart:', games);
    })
    .catch((error) => {
        console.error('Error retrieving games:', error);
    });





// platform and version both text
`
await db.run(queries.insertRuntimeEnvironments, {
    platform: 'Node.js',
    version: '18.16.0',
});

// title, short_description, genre, runtime_environment_id
await db.run(queries.insertGames, {
    title: 'Super Mario Bros.',
    short_description: 'A classic platform game.',
    genre: 'Platformer',
    runtime_environment_id: 1,
});
`






