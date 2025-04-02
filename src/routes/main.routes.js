import express from 'express';
import { MainController } from '../controller/main.Controller.js';

const router = express.Router();

router.get('/health', MainController.healthCheck);

router.get('/stats', MainController.getStats);

// Teams Routes


/**
 * @swagger
 * /teams:
 *   get:
 *     summary: Get all teams
 *     responses:
 *       200:
 *         description: List of teams
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *       500:
 *         description: Server error
 */
router.get('/teams', MainController.teamsController.getAllTeams);



router.get('/teams/:id', MainController.teamsController.getTeamByID);
router.post('/teams', MainController.teamsController.createTeam);
router.put('/teams/:id', MainController.teamsController.updateTeam);
router.delete('/teams/:id', MainController.teamsController.deleteTeam);

// Clubs Routes
router.get('/clubs', MainController.clubsController.getAllClubs);
router.get('/clubs/:id', MainController.clubsController.getClubByID);
router.post('/clubs', MainController.clubsController.createClub);
router.put('/clubs/:id', MainController.clubsController.updateClub);
router.delete('/clubs/:id', MainController.clubsController.deleteClub);

// Players Routes
router.get('/players', MainController.playersController.getAllPlayers);
router.get('/players/:id', MainController.playersController.getPlayerByID);
router.post('/players', MainController.playersController.createPlayer);
router.put('/players/:id', MainController.playersController.updatePlayer);
router.delete('/players/:id', MainController.playersController.deletePlayer);

// Tournaments Routes
router.get('/tournaments', MainController.tournamentsController.getAllTournaments);
router.get('/tournaments/:id', MainController.tournamentsController.getTournamentByID);
router.post('/tournaments', MainController.tournamentsController.createTournament);
router.put('/tournaments/:id', MainController.tournamentsController.updateTournament);
router.delete('/tournaments/:id', MainController.tournamentsController.deleteTournament);

// Matches Fixtures Routes
router.get('/matches', MainController.matchFixturesController.getAllMatchFixtures);
router.get('/matches/:id', MainController.matchFixturesController.getMatchByID);
router.post('/matches', MainController.matchFixturesController.createMatchFixture);
router.put('/matches/:id', MainController.matchFixturesController.updateMatchFixture);
router.delete('/matches/:id', MainController.matchFixturesController.deleteMatchFixture);

// // Tournaments Groups Routes
router.get('/tournaments-groups', MainController.tournamentsGroupController.getAllTournamentsGroup);
router.get('/tournaments-groups/:id', MainController.tournamentsGroupController.getTournamentsGroupByID);
router.post('/tournaments-groups', MainController.tournamentsGroupController.createTournamentsGroup);
router.put('/tournaments-groups/:id', MainController.tournamentsGroupController.updateTournamentsGroup);
router.delete('/tournaments-groups/:id', MainController.tournamentsGroupController.deleteTournamentsGroup);


router.use(MainController.notFound);

export default router;
