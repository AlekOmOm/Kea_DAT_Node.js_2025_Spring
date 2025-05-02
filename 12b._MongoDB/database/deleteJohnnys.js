import db from "./connection.js";

db.disciplines.deleteMany({ name: "JohnnyStuff" });
