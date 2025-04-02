import express from 'express';
import { MainController } from '../controller/main.Controller.js';

const router = express.Router();

// Health Check Routes
router.get('/health', MainController.healthCheck);
router.get('/stats', MainController.getStats);

// Teams Routes
{const teamsRouter = express.Router();
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
router.use('/teams', teamsRouter);}

// Clubs Routes
{const clubsRouter = express.Router();
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
router.use('/clubs', clubsRouter);}

// Players Routes
{const playersRouter = express.Router();
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
router.use('/players', playersRouter);}

// Tournaments Routes
{const tournamentsRouter = express.Router();
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
router.use('/tournaments', tournamentsRouter);}

// Matches Routes
{const matchesRouter = express.Router();
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
router.use('/matches', matchesRouter);}

// Tournament Groups Routes
{const tournamentsGroupRouter = express.Router();
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

router.use('/tournaments-groups', tournamentsGroupRouter);}

router.use(MainController.notFound);

export default router;
