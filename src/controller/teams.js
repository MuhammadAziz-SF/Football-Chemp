import db from "../models/index.js";

export const TeamsController = {
    getAllTeams: async (req, res) => {
        try {
            const teams = await db.Teams.findAll();
            res.status(200).json(teams);
        } catch (error) {
            console.error("Error fetching teams:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
    getTeamByID: async (req, res) => {
        try {
            const team = await db.Teams.findByPk(req.params.id);
            if (!team) {
                return res.status(404).json({ message: "Team not found" });
            }
            res.status(200).json(team);
        } catch (error) {
            console.error("Error fetching team:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
    createTeam: async (req, res) => {
        try {
            const { name, city, country } = req.body;
            const newTeam = await db.Teams.create({ name, city, country });
            res.status(201).json(newTeam);
        } catch (error) {
            console.error("Error creating team:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
    updateTeam: async (req, res) => {
        try {
            const { name, city, country } = req.body;
            const team = await db.Teams.findByPk(req.params.id);
            if (!team) {
                return res.status(404).json({ message: "Team not found" });
            }
            team.name = name;
            team.city = city;
            team.country = country;
            await team.save();
            res.status(200).json(team);
        } catch (error) {
            console.error("Error updating team:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
    deleteTeam: async (req, res) => {
        try {
            const team = await db.Teams.findByPk(req.params.id);
            if (!team) {
                return res.status(404).json({ message: "Team not found" });
            }
            await team.destroy();
            res.status(204).send();
        } catch (error) {
            console.error("Error deleting team:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
}