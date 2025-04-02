import db from "../models/index.js";


export const MatchFixturesController = { 
    getAllMatchFixtures: async (req, res) => {
        try {
            const matchFixtures = await db.MatchFixtures.findAll();
            res.status(200).json(matchFixtures);
        } catch (error) {
            res.status(500).json({ message: "Error retrieving match fixtures", error: error.message });
        }
    },

    getMatchByID: async (req, res) => {
        try {
            const matchFixture = await db.MatchFixtures.findByPk(req.params.id);
            if (!matchFixture) {
                return res.status(404).json({ message: "Match fixture not found" });
            }
            res.status(200).json(matchFixture);
        } catch (error) {
            res.status(500).json({ message: "Error retrieving match fixture", error: error.message });
        }
    },

    createMatchFixture: async (req, res) => {
        try {
            const matchFixture = await db.MatchFixtures.create(req.body);
            res.status(201).json(matchFixture);
        } catch (error) {
            res.status(500).json({ message: "Error creating match fixture", error: error.message });
        }
    },
    
    updateMatchFixture: async (req, res) => {
        try {
            const matchFixture = await db.MatchFixtures.findByPk(req.params.id);
            if (!matchFixture) {
                return res.status(404).json({ message: "Match fixture not found" });
            }
            await matchFixture.update(req.body);
            res.status(200).json(matchFixture);
        } catch (error) {
            res.status(500).json({ message: "Error updating match fixture", error: error.message });
        }
    },

    deleteMatchFixture: async (req, res) => {
        try {
            const matchFixture = await db.MatchFixtures.findByPk(req.params.id);
            if (!matchFixture) {
                return res.status(404).json({ message: "Match fixture not found" });
            }
            await matchFixture.destroy();
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: "Error deleting match fixture", error: error.message });
        }
    }
};
