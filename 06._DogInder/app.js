import express from "express";

import bodyParser from 'body-parser';

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.urlencoded({ extended: true }));

import pagesRouter from './routers/pagesRouter.js';
app.use(pagesRouter);
import matchesRouter from "./routers/matchesRouter.js";
app.use(matchesRouter);
import contactRouter from './routers/contactRouter.js';
app.use(contactRouter);


const PORT = Number(process.env.PORT) || 8080;
const server = app.listen(PORT, () =>
  console.log("Server is running on port", server.address().port)
);
