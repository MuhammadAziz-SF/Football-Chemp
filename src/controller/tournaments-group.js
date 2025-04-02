import db from "../models/index.js";

export const TournamentsGroupController = {
    getAllTournamentsGroup: async (req, res) => {
        try {
            const tournamentsGroup = await db.Tournament_groups.findAll();
            res.status(200).json(tournamentsGroup);
        } catch (error) {
            console.error("Error fetching tournaments group:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
    getTournamentsGroupByID: async (req, res) => {
        try {
            const tournamentsGroup = await db.Tournament_groups.findByPk(req.params.id);
            if (!tournamentsGroup) {
                return res.status(404).json({ message: "Tournaments group not found" });
            }
            res.status(200).json(tournamentsGroup);
        } catch (error) {
            console.error("Error fetching tournaments group:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
    createTournamentsGroup: async (req, res) => {
        try {
            const { name, date, location } = req.body;
            const newTournamentsGroup = await db.Tournament_groups.create({ name, date, location });
            res.status(201).json(newTournamentsGroup);
        } catch (error) {
            console.error("Error creating tournaments group:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
    updateTournamentsGroup: async (req, res) => {
        try {
            const { name, date, location } = req.body;
            const tournamentsGroup = await db.Tournament_groups.findByPk(req.params.id);
            if (!tournamentsGroup) {
                return res.status(404).json({ message: "Tournaments group not found" });
            }
            tournamentsGroup.name = name;
            tournamentsGroup.date = date;
            tournamentsGroup.location = location;
            await tournamentsGroup.save();
            res.status(200).json(tournamentsGroup);
        } catch (error) {
            console.error("Error updating tournaments group:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
    deleteTournamentsGroup: async (req, res) => {
        try {
            const tournamentsGroup = await db.Tournament_groups.findByPk(req.params.id);
            if (!tournamentsGroup) {
                return res.status(404).json({ message: "Tournaments group not found" });
            }
            await tournamentsGroup.destroy();
            res.status(204).send();
        } catch (error) {
            console.error("Error deleting tournaments group:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
    getTournamentsGroupByTournamentId: async (req, res) => {
        try {
            const tournamentsGroup = await db.Tournament_groups.findAll({
                where: { TournamentId: req.params.tournamentId },
            });
            if (!tournamentsGroup) {
                return res.status(404).json({ message: "Tournaments group not found" });
            }
            res.status(200).json(tournamentsGroup);
        } catch (error) {
            console.error("Error fetching tournaments group:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
}