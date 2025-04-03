import express from 'express';
import { MainController } from '../controller/main.Controller.js';

const matchRouter = express.Router();


// Matches Routes
const matchesRouter = express.Router();
/**
 * @swagger
 * /matches:
 *   get:
 *     tags:
 *       - Matches
 *     summary: Get all match fixtures
 *     responses:
 *       200:
 *         description: List of match fixtures
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             count:
 *               type: integer
 *             data:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   match_id:
 *                     type: string
 *                     format: uuid
 *                   tournament_id:
 *                     type: string
 *                     format: uuid
 *                   home_team_id:
 *                     type: string
 *                     format: uuid
 *                   away_team_id:
 *                     type: string
 *                     format: uuid
 *                   match_date:
 *                     type: string
 *                     format: date-time
 *                   home_score:
 *                     type: integer
 *                   away_score:
 *                     type: integer
 *                   status:
 *                     type: string
 *       400:
 *         description: Bad request
 */
matchesRouter.get('/', MainController.matchFixturesController.getAllMatchFixtures);

/**
 * @swagger
 * /matches/{id}:
 *   get:
 *     tags:
 *       - Matches
 *     summary: Get match fixture by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: UUID of the match fixture
 *     responses:
 *       200:
 *         description: Match fixture details
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             data:
 *               type: object
 *               properties:
 *                 match_id:
 *                   type: string
 *                   format: uuid
 *                 tournament_id:
 *                   type: string
 *                   format: uuid
 *                 home_team_id:
 *                   type: string
 *                   format: uuid
 *                 away_team_id:
 *                   type: string
 *                   format: uuid
 *                 match_date:
 *                   type: string
 *                   format: date-time
 *                 home_score:
 *                   type: integer
 *                 away_score:
 *                   type: integer
 *                 status:
 *                   type: string
 *       404:
 *         description: Match fixture not found
 *       400:
 *         description: Bad request
 */
matchesRouter.get('/:id', MainController.matchFixturesController.getMatchById);

/**
 * @swagger
 * /matches:
 *   post:
 *     tags:
 *       - Matches
 *     summary: Create a new match fixture
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tournamentId
 *               - homeTeamId
 *               - awayTeamId
 *               - matchDate
 *               - matchStatus
 *             properties:
 *               tournamentId:
 *                 type: string
 *                 format: uuid
 *               homeTeamId:
 *                 type: string
 *                 format: uuid
 *               awayTeamId:
 *                 type: string
 *                 format: uuid
 *               matchDate:
 *                 type: string
 *                 format: date-time
 *               homeScore:
 *                 type: integer
 *               awayScore:
 *                 type: integer
 *               venue:
 *                 type: string
 *               matchStatus:
 *                 type: string
 *     responses:
 *       201:
 *         description: Match fixture created successfully
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             data:
 *               type: object
 *               properties:
 *                 matchId:
 *                   type: string
 *                   format: uuid
 *                 tournamentId:
 *                   type: string
 *                   format: uuid
 *                 homeTeamId:
 *                   type: string
 *                   format: uuid
 *                 awayTeamId:
 *                   type: string
 *                   format: uuid
 *                 matchDate:
 *                   type: string
 *                   format: date-time
 *                 homeScore:
 *                   type: integer
 *                 awayScore:
 *                   type: integer
 *                 matchStatus:
 *                   type: string
 *       400:
 *         description: Bad request
 */
matchesRouter.post('/', MainController.matchFixturesController.createMatchFixture);

/**
 * @swagger
 * /matches/{id}:
 *   put:
 *     tags:
 *       - Matches
 *     summary: Update match fixture by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: UUID of the match fixture
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               homeScore:
 *                 type: integer
 *               awayScore:
 *                 type: integer
 *               matchStatus:
 *                 type: string
 *               matchDate:
 *                 type: string
 *                 format: date-time
 *               venue:
 *                 type: string
 *     responses:
 *       200:
 *         description: Match fixture updated successfully
 *       404:
 *         description: Match fixture not found
 *       400:
 *         description: Bad request
 */
matchesRouter.put('/:id', MainController.matchFixturesController.updateMatchFixture);

/**
 * @swagger
 * /matches/{id}:
 *   delete:
 *     tags:
 *       - Matches
 *     summary: Delete match fixture by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: UUID of the match fixture
 *     responses:
 *       200:
 *         description: Match fixture deleted successfully
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *       404:
 *         description: Match fixture not found
 *       400:
 *         description: Bad request
 */
matchesRouter.delete('/:id', MainController.matchFixturesController.deleteMatchFixture);

matchRouter.use('/matches', matchesRouter);

export default matchRouter;