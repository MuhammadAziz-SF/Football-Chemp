import express from 'express';
import { MainController } from '../controller/main.Controller.js';

const clubRouter = express.Router();



// Clubs Routes
const clubsRouter = express.Router();
/**
 * @swagger
 * /clubs:
 *   get:
 *     tags:
 *       - Clubs
 *     summary: Get all clubs
 *     responses:
 *       200:
 *         description: List of clubs
 *       400:
 *         description: Bad request
 */
clubsRouter.get('/', MainController.clubsController.getAllClubs);

/**
 * @swagger
 * /clubs/{id}:
 *   get:
 *     tags:
 *       - Clubs
 *     summary: Get club by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: UUID of the club
 *     responses:
 *       200:
 *         description: Club details
 *       404:
 *         description: Club not found
 *       400:
 *         description: Bad request
 */
clubsRouter.get('/:id', MainController.clubsController.getClubByID);

/**
 * @swagger
 * /clubs:
 *   post:
 *     tags:
 *       - Clubs
 *     summary: Create a new club
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - club_name
 *               - city
 *               - country
 *             properties:
 *               club_name:
 *                 type: string
 *               city:
 *                 type: string
 *               country:
 *                 type: string
 *               founded_year:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Club created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 club_id:
 *                   type: string
 *                   format: uuid
 *                 club_name:
 *                   type: string
 *                 city:
 *                   type: string
 *                 country:
 *                   type: string
 *                 founded_year:
 *                   type: integer
 *       400:
 *         description: Bad request
 *       409:
 *         description: Club with this name already exists
 *       500:
 *         description: Internal server error
 */
clubsRouter.post('/', MainController.clubsController.createClub);

/**
 * @swagger
 * /clubs/{id}:
 *   put:
 *     tags:
 *       - Clubs
 *     summary: Update club by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: UUID of the club
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               club_name:
 *                 type: string
 *               city:
 *                 type: string  
 *               country:
 *                 type: string
 *               founded_year:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Club updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 club_id:
 *                   type: string
 *                   format: uuid
 *                 club_name:
 *                   type: string
 *                 city:
 *                   type: string
 *                 country:
 *                   type: string
 *                 founded_year:
 *                   type: integer
 *       404:
 *         description: Club not found
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
clubsRouter.put('/:id', MainController.clubsController.updateClub);

/**
 * @swagger
 * /clubs/{id}:
 *   delete:
 *     tags:
 *       - Clubs
 *     summary: Delete club by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: UUID of the club
 *     responses:
 *       200:
 *         description: Club deleted successfully
 *       404:
 *         description: Club not found
 *       400:
 *         description: Bad request
 */
clubsRouter.delete('/:id', MainController.clubsController.deleteClub);

clubRouter.use('/clubs', clubsRouter);


export default clubRouter;
