import db from "./connection.js";

const updatedDiscipline = await db.disciplines.updateOne(
  { name: "Karate" },
  {
    $set: {
      subscription: {
        price: 200,
        currency: "DDK",
      },
    },
  }
);

console.log(updatedDiscipline);
