import db from '../models/index.js';
import logs from '../config/logs.js';


export const TournamentsController = {
  getAllTournaments: async (req, res) => {
    try {
      logs.info("Fetching all tournaments");
      const tournaments = await db.Tournament.findAll();
      logs.info(`Successfully retrieved ${tournaments.length} tournaments`);
      res.status(200).json(tournaments);
    } catch (error) {
      logs.error("Error fetching tournaments", { error: error.message });
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  getTournamentById: async (req, res) => {
    try {
      logs.info(`Fetching tournament with ID: ${req.params.id}`);
      const tournament = await db.Tournament.findByPk(req.params.id);
      if (!tournament) {
        logs.warn(`Tournament with ID: ${req.params.id} not found`);
        return res.status(404).json({ message: 'Tournament not found' });
      }
      logs.info(`Successfully retrieved tournament with ID: ${req.params.id}`);
      res.status(200).json(tournament);
    } catch (error) {
      logs.error(`Error fetching tournament with ID: ${req.params.id}`, { error: error.message });
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  createTournament: async (req, res) => {
    try {
      logs.info("Creating new tournament", { data: req.body });
      const { tournamentName, startDate, endDate, status } = req.body;
      const newTournament = await db.Tournament.create({ 
        tournament_name: tournamentName,
        start_date: startDate,
        end_date: endDate,
        status: status
      });
      logs.info(`Successfully created tournament with ID: ${newTournament.tournament_id}`);
      res.status(201).json(newTournament);
    } catch (error) {
      logs.error("Error creating tournament", { error: error.message, data: req.body });
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  },
  updateTournament: async (req, res) => {
    try {
      logs.info(`Updating tournament with ID: ${req.params.id}`, { data: req.body });
      const { tournamentName, startDate, endDate, status } = req.body;
      const tournament = await db.Tournament.findByPk(req.params.id);
      if (!tournament) {
        logs.warn(`Tournament with ID: ${req.params.id} not found for update`);
        return res.status(404).json({ message: 'Tournament not found' });
      }

      const updatedData = {
        tournament_name: tournamentName || tournament.tournament_name,
        start_date: startDate || tournament.start_date,
        end_date: endDate || tournament.end_date,
        status: status || tournament.status
      };

      await db.Tournament.update(updatedData, {
        where: { tournament_id: req.params.id }
      });

      const updatedTournament = await db.Tournament.findByPk(req.params.id);
      logs.info(`Successfully updated tournament with ID: ${req.params.id}`);
      res.status(200).json(updatedTournament);
    } catch (error) {
      logs.error(`Error updating tournament with ID: ${req.params.id}`, { error: error.message, data: req.body });
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  },
  deleteTournament: async (req, res) => {
    try {
      logs.info(`Deleting tournament with ID: ${req.params.id}`);
      const tournament = await db.Tournament.findByPk(req.params.id);
      if (!tournament) {
        logs.warn(`Tournament with ID: ${req.params.id} not found for deletion`);
        return res.status(404).json({ message: 'Tournament not found' });
      }
      await tournament.destroy();
      logs.info(`Successfully deleted tournament with ID: ${req.params.id}`);
      res.status(204).send("Successfully deleted tournament");
    } catch (error) {
      logs.error(`Error deleting tournament with ID: ${req.params.id}`, { error: error.message });
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};
