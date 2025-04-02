// routes/tournament.routes.js
import express from 'express';
import db from '../models/index.js';
const router = express.Router();

// GET all tournaments
router.get('/', async (req, res) => {
  try {
    const tournaments = await db.Tournament.findAll();
    res.json(tournaments);
  } catch (error) {
    console.error('Error fetching tournaments:', error);
    res.status(500).json({ message: 'Failed to fetch tournaments', error: error.message });
  }
});