import db from "./connection.js";

const newDiscipline = await db.disciplines.insertOne({ name: "JohnnyStuff" });

console.log(newDiscipline);
