import express from "express";

const app = express();

// --- middlewares ---

// User
function greetLoggedInUser(req, res, next) {
  // assuming DB already checked and user is logged in
  console.log("welcome User");
  next();
}
app.use(greetLoggedInUser);

import apiRouter from "./routers/middlewareRouters.js";
app.use(apiRouter);

import authRouter from "./routers/authRouter.js";
app.use(authRouter);

// --- server ---
const PORT = Number(process.env.PORT) || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
