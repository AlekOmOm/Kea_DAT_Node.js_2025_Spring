import { Router } from 'express';

const router = Router();

import { frontpagePage, matchesPage, matchPage } from '../util/pages.js';


router.get("/", (req, res) => {
    res.send(frontpagePage);
});

router.get("/matches", (req, res) => {
    res.send(matchesPage);
});

router.get("/match", (req, res) => {
    res.send(matchPage);
});

export default router;
