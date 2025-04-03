import express from 'express';
import { MainController } from '../controller/main.Controller.js';
import clubRouter from "./clubs.routes.js"
import matchRouter from "./matches.routes.js"
import playerRouter from "./players.routes.js"
import tourRouter from "./tournament.routes.js"
import groupRouter from "./tourgroup.routes.js"
import teamRouter from "./team.routes.js"

const router = express.Router();

// Health Check Routes
router.get('/health', MainController.healthCheck);
router.get('/stats', MainController.getStats);


router.use(MainController.notFound);

const mainRouter = {
    clubRouter,
    matchRouter,
    playerRouter,
    tourRouter,
    groupRouter,
    teamRouter
}

export default mainRouter;
