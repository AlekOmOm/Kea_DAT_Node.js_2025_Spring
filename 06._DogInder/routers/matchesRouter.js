import { Router } from "express";

const router = Router();

import { getMatches } from '../util/matches.js';

router.get("/api/matches", async (req, res) => {
    const matches = await getMatches();
    res.send({ data: matches });
});

router.post("/api/matchContact", async (req, res) => {

    const { name, email, message } = req.body;

    console.log({ data: {
        name,    
        email,
        message
    }});

    res.redirect('/matches?status=success&message=Message sent successfully');
});


export default router;



