import Router from "express";
import { exec } from "child_process";

const router = Router();

// ------- middleware -------

import queries from "../database/queries.js";
import db from "../database/connection.js";

// ------- routes -------
router.get("/", async (req, res) => {
  try {
    const games = await db.all(queries.selectAllGames);
    res.send({ data: games });
  } catch (error) {
    console.error("Error fetching games:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/", async (req, res) => {
  if (!req.body.title) {
    return res.status(400).send("Title is required");
  }

  await db.run(queries.insertGames, [
    req.body.title,
    req.body.shortDescription,
    req.body.genre,
    req.body.runtimeEnvironmentsId,
  ]);

  console.log("Game inserted:", req.body.title);

  // print games
  printGames();

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
`;

router.get("/resetDB", async (req, res) => {
  try {
    // execute terminal command npm run resetDB

    exec("npm run resetDB", (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return res.status(500).send("Internal Server Error");
      }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    });

    printGames();

    res.send("Database reset initiated. Check console for progress.");
  } catch (error) {
    console.error("Error resetting database:", error);
    res.status(500).send("Internal Server Error");
  }
});

// ------- helper functions -------
async function printGames() {
  const games = await db.all(queries.selectAllGames);
  console.log("Games:", games);
}

// ------ export ------
export default router;
