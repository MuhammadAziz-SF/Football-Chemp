import express from 'express';
import { MainController } from '../controller/main.Controller.js';

const teamRouter = express.Router();

// Teams Routes
const teamsRouter = express.Router();
/**
 * @swagger
 * /teams:
 *   get:
 *     tags:
 *       - Teams
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
teamsRouter.get('/', MainController.teamsController.getAllTeams);

/**
 * @swagger
 * /teams/{id}:
 *   get:
 *     tags:
 *       - Teams
 *     summary: Get team by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: UUID of the team
 *     responses:
 *       200:
 *         description: Team details
 *       404:
 *         description: Team not found
 *       400:
 *         description: Bad request
 */
teamsRouter.get('/:id', MainController.teamsController.getTeamByID);
/**
 * @swagger
 * /teams:
 *   post:
 *     tags:
 *       - Teams
 *     summary: Create a new team
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - team_name
 *               - club_id
 *               - group_id
 *               - coach_name
 *             properties:
 *               team_name:
 *                 type: string
 *                 description: Name of the team
 *               club_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the associated football club
 *               group_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the tournament group
 *               coach_name:
 *                 type: string
 *                 description: Name of the team's coach
 *     responses:
 *       201:
 *         description: Team created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 team_id:
 *                   type: string
 *                   format: uuid
 *                 team_name:
 *                   type: string
 *                 club_id:
 *                   type: string
 *                   format: uuid
 *                 group_id:
 *                   type: string
 *                   format: uuid
 *                 coach_name:
 *                   type: string
 *       400:
 *         description: Bad request - missing required fields
 *       500:
 *         description: Internal server error
 */
teamsRouter.post('/', MainController.teamsController.createTeam);

/**
 * @swagger
 * /teams/{id}:
 *   put:
 *     tags:
 *       - Teams
 *     summary: Update team by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: UUID of the team
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               teamName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Team updated successfully
 *       404:
 *         description: Team not found
 *       400:
 *         description: Bad request
 */
teamsRouter.put('/:id', MainController.teamsController.updateTeam);

/**
 * @swagger
 * /teams/{id}:
 *   delete:
 *     tags:
 *       - Teams
 *     summary: Delete team by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: UUID of the team
 *     responses:
 *       200:
 *         description: Team deleted successfully
 *       404:
 *         description: Team not found
 *       400:
 *         description: Bad request
 */
teamsRouter.delete('/:id', MainController.teamsController.deleteTeam);

teamRouter.use('/teams', teamsRouter);

export default teamRouter;