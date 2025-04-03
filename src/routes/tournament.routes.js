import express from 'express';
import { MainController } from '../controller/main.Controller.js';

const tourRouter = express.Router();

// Tournaments Routes
const tournamentsRouter = express.Router();
/**
 * @swagger
 * /tournaments:
 *   get:
 *     tags:
 *       - Tournaments
 *     summary: Get all tournaments
 *     responses:
 *       200:
 *         description: List of tournaments
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
 *                   tournament_id:
 *                     type: string
 *                     format: uuid
 *                   tournament_name:
 *                     type: string
 *                   start_date:
 *                     type: string
 *                     format: date
 *                   end_date:
 *                     type: string
 *                     format: date
 *                   status:
 *                     type: string
 *       400:
 *         description: Bad request
 */
tournamentsRouter.get('/', MainController.tournamentsController.getAllTournaments);

/**
 * @swagger
 * /tournaments/{id}:
 *   get:
 *     tags:
 *       - Tournaments
 *     summary: Get tournament by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: UUID of the tournament
 *     responses:
 *       200:
 *         description: Tournament details
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             data:
 *               type: object
 *               properties:
 *                 tournament_id:
 *                   type: string
 *                   format: uuid
 *                 tournament_name:
 *                   type: string
 *                 start_date:
 *                   type: string
 *                   format: date
 *                 end_date:
 *                   type: string
 *                   format: date
 *                 status:
 *                   type: string
 *       404:
 *         description: Tournament not found
 *       400:
 *         description: Bad request
 */
tournamentsRouter.get('/:id', MainController.tournamentsController.getTournamentById);

/**
 * @swagger
 * /tournaments:
 *   post:
 *     tags:
 *       - Tournaments
 *     summary: Create a new tournament
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tournamentName
 *               - startDate
 *               - endDate
 *               - status
 *             properties:
 *               tournamentName:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *                 enum: ['UPCOMING', 'IN_PROGRESS', 'COMPLETED']
 *     responses:
 *       201:
 *         description: Tournament created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     tournament_id:
 *                       type: string
 *                       format: uuid
 *                     tournament_name:
 *                       type: string
 *                     start_date:
 *                       type: string
 *                       format: date
 *                     end_date:
 *                       type: string
 *                       format: date
 *                     status:
 *                       type: string
 *       400:
 *         description: Bad request - Invalid input data
 *       409:
 *         description: Conflict - Tournament name already exists
 */
tournamentsRouter.post('/', MainController.tournamentsController.createTournament);

/**
 * @swagger
 * /tournaments/{id}:
 *   put:
 *     tags:
 *       - Tournaments
 *     summary: Update tournament by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: UUID of the tournament
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tournamentName:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tournament updated successfully
 *       404:
 *         description: Tournament not found
 */
tournamentsRouter.put('/:id', MainController.tournamentsController.updateTournament);

/**
 * @swagger
 * /tournaments/{id}:
 *   delete:
 *     tags:
 *       - Tournaments
 *     summary: Delete tournament by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: UUID of the tournament
 *     responses:
 *       200:
 *         description: Tournament deleted successfully
 *       404:
 *         description: Tournament not found
 */
tournamentsRouter.delete('/:id', MainController.tournamentsController.deleteTournament);

tourRouter.use('/tournaments', tournamentsRouter);

export default tourRouter;