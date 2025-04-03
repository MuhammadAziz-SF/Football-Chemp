import express from 'express';
import { MainController } from '../controller/main.Controller.js';

const groupRouter = express.Router();


// Tournament Groups Routes
const tournamentsGroupRouter = express.Router();
/**
 * @swagger
 * /tournaments-groups:
 *   get:
 *     tags:
 *       - Tournament Groups
 *     summary: Get all tournament groups
 *     responses:
 *       200:
 *         description: List of tournament groups
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
 *                   group_id:
 *                     type: string
 *                     format: uuid
 *                   tournament_id:
 *                     type: string
 *                     format: uuid
 *                   group_name:
 *                     type: string
 *       400:
 *         description: Bad request
 */
tournamentsGroupRouter.get('/', MainController.tournamentsGroupController.getAllTournamentsGroup);

/**
 * @swagger
 * /tournaments-groups/{id}:
 *   get:
 *     tags:
 *       - Tournament Groups
 *     summary: Get tournament group by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: UUID of the tournament group
 *     responses:
 *       200:
 *         description: Tournament group details
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             data:
 *               type: object
 *               properties:
 *                 group_id:
 *                   type: string
 *                   format: uuid
 *                 tournament_id:
 *                   type: string
 *                   format: uuid
 *                 group_name:
 *                   type: string
 *       404:
 *         description: Tournament group not found
 *       400:
 *         description: Bad request
 */
tournamentsGroupRouter.get('/:id', MainController.tournamentsGroupController.getTournamentsGroupById);

/**
 * @swagger
 * /tournaments-groups:
 *   post:
 *     tags:
 *       - Tournament Groups
 *     summary: Create a new tournament group
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tournamentId
 *               - groupName
 *             properties:
 *               tournamentId:
 *                 type: string
 *                 format: uuid
 *               groupName:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tournament group created successfully
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             data:
 *               type: object
 *               properties:
 *                 group_id:
 *                   type: string
 *                   format: uuid
 *                 tournament_id:
 *                   type: string
 *                   format: uuid
 *                 group_name:
 *                   type: string
 *       400:
 *         description: Bad request
 */
tournamentsGroupRouter.post('/', MainController.tournamentsGroupController.createTournamentsGroup);

/**
 * @swagger
 * /tournaments-groups/{id}:
 *   put:
 *     tags:
 *       - Tournament Groups
 *     summary: Update tournament group by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: UUID of the tournament group
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               groupName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tournament group updated successfully
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             data:
 *               type: object
 *               properties:
 *                 group_id:
 *                   type: string
 *                   format: uuid
 *                 tournament_id:
 *                   type: string
 *                   format: uuid
 *                 group_name:
 *                   type: string
 *       404:
 *         description: Tournament group not found
 *       400:
 *         description: Bad request
 */
tournamentsGroupRouter.put('/:id', MainController.tournamentsGroupController.updateTournamentsGroup);

/**
 * @swagger
 * /tournaments-groups/{id}:
 *   delete:
 *     tags:
 *       - Tournament Groups
 *     summary: Delete tournament group by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: UUID of the tournament group
 *     responses:
 *       200:
 *         description: Tournament group deleted successfully
 *       404:
 *         description: Tournament group not found
 *       400:
 *         description: Bad request
 */
tournamentsGroupRouter.delete('/:id', MainController.tournamentsGroupController.deleteTournamentsGroup);

groupRouter.use('/tournaments-groups', tournamentsGroupRouter)

export default groupRouter;