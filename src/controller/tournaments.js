import db from '../models/index.js';


export const TournamentsController = {
  getAllTournaments: async (req, res) => {
    try {
      const tournaments = await db.Tournament.findAll();
      res.status(200).json(tournaments);
    } catch (error) {
      console.error('Error fetching tournaments:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  getTournamentByID: async (req, res) => {
    try {
      const tournament = await db.Tournament.findByPk(req.params.id);
      if (!tournament) {
        return res.status(404).json({ message: 'Tournament not found' });
      }
      res.status(200).json(tournament);
    } catch (error) {
      console.error('Error fetching tournament:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  createTournament: async (req, res) => {
    try {
      const { name, date, location } = req.body;
      const newTournament = await db.Tournament.create({ name, date, location });
      res.status(201).json(newTournament);
    } catch (error) {
      console.error('Error creating tournament:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  updateTournament: async (req, res) => {
    try {
      const { name, date, location } = req.body;
      const tournament = await db.Tournament.findByPk(req.params.id);
      if (!tournament) {
        return res.status(404).json({ message: 'Tournament not found' });
      }
      tournament.name = name;
      tournament.date = date;
      tournament.location = location;
      await tournament.save();
      res.status(200).json(tournament);
    } catch (error) {
      console.error('Error updating tournament:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  deleteTournament: async (req, res) => {
    try {
      const tournament = await db.Tournament.findByPk(req.params.id);
      if (!tournament) {
        return res.status(404).json({ message: 'Tournament not found' });
      }
      await tournament.destroy();
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting tournament:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};
