import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

const dbName = "martialArts";

await client.connect();

const db = await client.db(dbName);

export default {
  disciplines: db.collection("disciplines"),
  locations: db.collection("locations"),
};
