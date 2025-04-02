import db from "../models/index.js";
import logs from "../config/logs.js";


export const MatchFixturesController = { 
    getAllMatchFixtures: async (req, res) => {
        try {
            logs.info("Fetching all match fixtures");
            const matchFixtures = await db.MatchFixtures.findAll();
            logs.info(`Successfully retrieved ${matchFixtures.length} match fixtures`);
            res.status(200).json(matchFixtures);
        } catch (error) {
            logs.error("Error retrieving match fixtures", { error: error.message });
            res.status(500).json({ message: "Error retrieving match fixtures", error: error.message });
        }
    },

    getMatchById: async (req, res) => {
        try {
            logs.info(`Fetching match fixture with ID: ${req.params.id}`);
            const matchFixture = await db.MatchFixtures.findByPk(req.params.id);
            if (!matchFixture) {
                logs.warn(`Match fixture with ID: ${req.params.id} not found`);
                return res.status(404).json({ message: "Match fixture not found" });
            }
            logs.info(`Successfully retrieved match fixture with ID: ${req.params.id}`);
            res.status(200).json(matchFixture);
        } catch (error) {
            logs.error(`Error retrieving match fixture with ID: ${req.params.id}`, { error: error.message });
            res.status(500).json({ message: "Error retrieving match fixture", error: error.message });
        }
    },

    createMatchFixture: async (req, res) => {
        try {
            logs.info("Creating new match fixture", { data: req.body });
            const { matchDate, venue, homeTeamId, awayTeamId, tournamentId, matchStatus } = req.body;
            
            if (!matchDate || !homeTeamId || !awayTeamId || !tournamentId || !matchStatus) {
                logs.warn("Missing required fields in match fixture creation request");
                return res.status(400).json({ message: "Missing required fields" });
            }
            
            const matchFixture = await db.MatchFixtures.create({
                matchDate,
                venue,
                homeTeamId,
                awayTeamId,
                tournamentId,
                homeScore: req.body.homeScore,
                awayScore: req.body.awayScore,
                matchStatus
            });
            
            logs.info(`Successfully created match fixture with ID: ${matchFixture.matchId}`);
            res.status(201).json(matchFixture);
        } catch (error) {
            logs.error("Error creating match fixture", { error: error.message, data: req.body });
            res.status(500).json({ message: "Error creating match fixture", error: error.message });
        }
    },
    
    updateMatchFixture: async (req, res) => {
        try {
            logs.info(`Updating match fixture with ID: ${req.params.id}`, { data: req.body });
            const matchFixture = await db.MatchFixtures.findByPk(req.params.id);
            if (!matchFixture) {
                logs.warn(`Match fixture with ID: ${req.params.id} not found for update`);
                return res.status(404).json({ message: "Match fixture not found" });
            }
            
            const { matchDate, venue, homeTeamId, awayTeamId, tournamentId, homeScore, awayScore, matchStatus } = req.body;
            
            await matchFixture.update({
                matchDate: matchDate || matchFixture.matchDate,
                venue: venue !== undefined ? venue : matchFixture.venue,
                homeTeamId: homeTeamId || matchFixture.homeTeamId,
                awayTeamId: awayTeamId || matchFixture.awayTeamId,
                tournamentId: tournamentId || matchFixture.tournamentId,
                homeScore: homeScore !== undefined ? homeScore : matchFixture.homeScore,
                awayScore: awayScore !== undefined ? awayScore : matchFixture.awayScore,
                matchStatus: matchStatus || matchFixture.matchStatus
            });
            
            const updatedMatchFixture = await db.MatchFixtures.findByPk(req.params.id);
            
            logs.info(`Successfully updated match fixture with ID: ${req.params.id}`);
            res.status(200).json(updatedMatchFixture);
        } catch (error) {
            logs.error(`Error updating match fixture with ID: ${req.params.id}`, { error: error.message, data: req.body });
            res.status(500).json({ message: "Error updating match fixture", error: error.message });
        }
    },

    deleteMatchFixture: async (req, res) => {
        try {
            logs.info(`Deleting match fixture with ID: ${req.params.id}`);
            const matchFixture = await db.MatchFixtures.findByPk(req.params.id);
            if (!matchFixture) {
                logs.warn(`Match fixture with ID: ${req.params.id} not found for deletion`);
                return res.status(404).json({ message: "Match fixture not found" });
            }
            await matchFixture.destroy();
            logs.info(`Successfully deleted match fixture with ID: ${req.params.id}`);
            res.status(204).send("Successfully deleted match fixture");
        } catch (error) {
            logs.error(`Error deleting match fixture with ID: ${req.params.id}`, { error: error.message });
            res.status(500).json({ message: "Error deleting match fixture", error: error.message });
        }
    }
};
