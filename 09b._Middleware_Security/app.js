import express from "express";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";

const app = express();
app.use(helmet());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 300, // requests per windowMs
    standardHeaders: 'draft-8', // return rate limit info in `RateLimit-*` headers
    legacyHeaders: false,
    // store: ..., // Redis, MongoDB, etc.
});
app.use(limiter);

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 100 requests per windowMs
    message: "<h1>Too many accounts created from this IP, please try again later.</h1>",
    standardHeaders: 'draft-8', // return rate limit info in `RateLimit-*` headers
    legacyHeaders: false,
});
app.use("/auth", authLimiter);


// --- middlewares ---

    // general greeting
function greetLoggedInUser(req, res, next) {
  // assuming DB already checked and user is logged in
  console.log("welcome User");
  next();

    req, res, next;
}
app.use(greetLoggedInUser);

import apiRouter from "./routers/middlewareRouters.js";
app.use(apiRouter);

import authRouter from "./routers/authRouter.js";
app.use(authRouter);

app.get("/{*splat}", (req, res, next) => {
  res.status(404).send(`<h1>404 ${req.params.splat} not found</h1>`);
});

// --- server ---
const PORT = Number(process.env.PORT) || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
