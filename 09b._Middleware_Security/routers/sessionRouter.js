import session from "express-session";

import { Router } from "express";

const router = Router();

// --- routes ---
    // url: http://localhost:PORT/session/fillbananas
router.get("/session/fillbananas", (req, res) => {

    // check if session exists
    if (req.session.bananas) {
        req.session.bananas += 1;
    } else {
        req.session.bananas = 1;
    }

    res.send({ message: `bananas: ${req.session.bananas}` });

});


router.get("/session/eatbananas", (req, res) => {

    // check if session exists
    if (req.session.bananas) {
        req.session.bananas -= 1;
    } else {
        req.session.bananas = 0;
    }

    res.send({ message: `bananas: ${req.session.bananas}` });

});









// --- export ---

export default router;
