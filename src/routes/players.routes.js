import express from 'express';
import { MainController } from '../controller/main.Controller.js';

const playerRouter = express.Router();


// Players Routes
const playersRouter = express.Router();
/**
 * @swagger
 * /players:
 *   get:
 *     tags:
 *       - Players
 *     summary: Get all players
 *     responses:
 *       200:
 *         description: List of players
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
 *                   player_id:
 *                     type: string
 *                     format: uuid
 *                   first_name:
 *                     type: string
 *                   last_name:
 *                     type: string
 *                   nationality:
 *                     type: string
 *                   date_of_birth:
 *                     type: string
 *                     format: date
 *                   position:
 *                     type: string
 *                   club_id:
 *                     type: string
 *                     format: uuid
 *       400:
 *         description: Bad request
 */
playersRouter.get('/', MainController.playersController.getAllPlayers);

/**
 * @swagger
 * /players/{id}:
 *   get:
 *     tags:
 *       - Players
 *     summary: Get player by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: UUID of the player
 *     responses:
 *       200:
 *         description: Player details
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             data:
 *               type: object
 *               properties:
 *                 player_id:
 *                   type: string
 *                   format: uuid
 *                 first_name:
 *                   type: string
 *                 last_name:
 *                   type: string
 *                 nationality:
 *                   type: string
 *                 date_of_birth:
 *                   type: string
 *                   format: date
 *                 position:
 *                   type: string
 *                 club_id:
 *                   type: string
 *                   format: uuid
 *       404:
 *         description: Player not found
 *       400:
 *         description: Bad request
 */
playersRouter.get('/:id', MainController.playersController.getPlayerByID);
/**
 * @swagger
 * /players:
 *   post:
 *     tags:
 *       - Players
 *     summary: Create a new player
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - full_name
 *               - date_of_birth
 *               - position
 *               - team_id
 *               - jersey_number
 *             properties:
 *               full_name:
 *                 type: string
 *                 description: Full name of the player
 *               date_of_birth:
 *                 type: string
 *                 format: date
 *                 description: Date of birth of the player
 *               position:
 *                 type: string
 *                 description: Player's position on the field
 *               team_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the team the player belongs to
 *               jersey_number:
 *                 type: integer
 *                 description: Player's jersey number
 *     responses:
 *       201:
 *         description: Player created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 player_id:
 *                   type: string
 *                   format: uuid
 *                 full_name:
 *                   type: string
 *                 date_of_birth:
 *                   type: string
 *                   format: date
 *                 position:
 *                   type: string
 *                 team_id:
 *                   type: string
 *                   format: uuid
 *                 jersey_number:
 *                   type: integer
 *       400:
 *         description: Bad request - missing required fields
 *       500:
 *         description: Internal server error
 */
playersRouter.post('/', MainController.playersController.createPlayer);

/**
 * @swagger
 * /players/{id}:
 *   put:
 *     tags:
 *       - Players
 *     summary: Update player by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               position:
 *                 type: string
 *     responses:
 *       200:
 *         description: Player updated successfully
 *       404:
 *         description: Player not found
 */
playersRouter.put('/:id', MainController.playersController.updatePlayer);

/**
 * @swagger
 * /players/{id}:
 *   delete:
 *     tags:
 *       - Players
 *     summary: Delete player by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *     responses:
 *       200:
 *         description: Player deleted successfully
 *       404:
 *         description: Player not found
 */
playersRouter.delete('/:id', MainController.playersController.deletePlayer);

playerRouter.use('/players', playersRouter);

export default playerRouter;