import express from 'express';


const app = express();

const PORT = process.env.PORT || 8080;

// --- middleware ---
app.use(express.json());

import gamesRouter from './routers/gamesRouter.js';
app.use("/api/games", gamesRouter);









// --- server ---

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
