import db from '../models/index.js';
import { TeamsController } from './teams.js';
import { ClubsController } from './clubs.js';
import { PlayersController } from './players.js';
import { TournamentsController } from './tournaments.js';
import { MatchFixturesController } from './match_fixtures.js';
import { TournamentsGroupController } from './tournaments-group.js';


export const MainController = {
      
    teamsController: TeamsController,
    clubsController: ClubsController,
    playersController: PlayersController,
    tournamentsController: TournamentsController,
    matchFixturesController: MatchFixturesController,
    tournamentsGroupController: TournamentsGroupController,

    healthCheck: async (req, res) => {
        try {
            res.status(200).json({ message: "API is up and running!" });
        } catch (error) {
            console.error("Error in health check:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    getStats: async (req, res) => {
        try {
            
            const teamCount = await db.Teams.count();
            const clubCount = await db.Clubs.count();
            const playerCount = await db.Players.count();
            const tournamentCount = await db.Tournament.count();
            const matchCount = await db.MatchFixtures.count();
            const tournamentGroupCount = await db.Tournament_groups.count();

            res.status(200).json({ 
                teamCount,
                clubCount,
                playerCount,
                tournamentCount,
                matchCount,
                tournamentGroupCount
            });
        } catch (error) {
            console.error("Error fetching stats:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    notFound: (req, res) => {
        res.status(404).json({ message: "Route not found" });
    },

    errorHandler: (err, req, res, next) => {
        console.error("Unhandled error:", err);
        res.status(500).json({ message: "Something went wrong", error: err.message });
    }
};
