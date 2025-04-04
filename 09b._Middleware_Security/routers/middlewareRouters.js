import { Router } from "express";

const apiRouter = Router();

// --- apiRouter routes
apiRouter.get(
  "/room",
  (req, res, next) => {
    console.log("You are in the lobby for room 2");
    next();
  },
  (req, res, next) => {
    console.log("Welcome to room 3");
  }
);

/**
 * flow of above on call to /room:
 * 1. hit first '/room' route
 * 2. call next() to go to the next middleware
 * 3. hit second '/room' route
 * 4. call next() to go to the next middleware
 * 5. hit third '/room' route
 * 6. Welcome to room 3 !
 **
 */

// greeter

function greeter(req, res, next) {
  console.log("Welcome to the room!");
  next();
}

function ipLogger(req, res, next) {
  console.log(`IP: ${req.ip}`);
  next();
}

/*
 * above is middleware functions
 * - greeter: logs welcome message
 * - ipLogger: logs IP address
 * usable:
 * - app.use(greeter)
 * - app.use(ipLogger)
 *
 */

apiRouter.get("/room2", greeter, ipLogger, (req, res) => {
  //res.send({  message: 'welcome to the room!' });
  next();
});

apiRouter.get(
  "/room",
  (req, res, next) => {
    console.log("You are in the lobby for room 2");
    next();
  },
  (req, res, next) => {
    console.log("Welcome to room 3");
  }
);

export default apiRouter;
