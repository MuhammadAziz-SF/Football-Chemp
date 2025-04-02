import db from "../models/index.js";

export const ClubsController = {
    getAllClubs: async (req, res) => {
        try {
            const clubs = await db.Clubs.findAll();
            res.status(200).json(clubs);
        } catch (error) {
            res.status(500).json({ message: "Error retrieving clubs", error });
        }
    },

    getClubByID: async (req, res) => {
        try {
            const club = await db.Clubs.findByPk(req.params.id);
            if (!club) {
                return res.status(404).json({ message: "Club not found" });
            }
            res.status(200).json(club);
        } catch (error) {
            res.status(500).json({ message: "Error retrieving club", error });
        }
    },

    createClub: async (req, res) => {
        try {
            const club = await db.Clubs.create(req.body);
            res.status(201).json(club);
        } catch (error) {
            res.status(500).json({ message: "Error creating club", error });
        }
    },

    updateClub: async (req, res) => {
        try {
            const club = await db.Clubs.findByPk(req.params.id);
            if (!club) {
                return res.status(404).json({ message: "Club not found" });
            }
            await club.update(req.body);
            res.status(200).json(club);
        } catch (error) {
            res.status(500).json({ message: "Error updating club", error });
        }
    },

    deleteClub: async (req, res) => {
        try {
            const club = await db.Clubs.findByPk(req.params.id);
            if (!club) {
                return res.status(404).json({ message: "Club not found" });
            }
            await club.destroy();
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: "Error deleting club", error });
        }
    }
};
