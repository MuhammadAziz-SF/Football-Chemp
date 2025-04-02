import db from "../models/index.js";
import logs from "../config/logs.js";

export const TeamsController = {
    getAllTeams: async (req, res) => {
        try {
            logs.info("Fetching all teams");
            const teams = await db.Teams.findAll();
            logs.info(`Successfully retrieved ${teams.length} teams`);
            res.status(200).json(teams);
        } catch (error) {
            logs.error("Error fetching teams", { error: error.message });
            res.status(500).json({ message: "Internal server error" });
        }
    },
    getTeamByID: async (req, res) => {
        try {
            logs.info(`Fetching team with ID: ${req.params.id}`);
            const team = await db.Teams.findByPk(req.params.id);
            if (!team) {
                logs.warn(`Team with ID: ${req.params.id} not found`);
                return res.status(404).json({ message: "Team not found" });
            }
            logs.info(`Successfully retrieved team with ID: ${req.params.id}`);
            res.status(200).json(team);
        } catch (error) {
            logs.error(`Error fetching team with ID: ${req.params.id}`, { error: error.message });
            res.status(500).json({ message: "Internal server error" });
        }
    },
    createTeam: async (req, res) => {
        try {
            logs.info("Creating new team", { data: req.body });
            const { team_name, club_id, group_id, coach_name } = req.body;
            
            if (!team_name || !club_id || !group_id || !coach_name) {
                logs.warn("Missing required fields in team creation request");
                return res.status(400).json({ message: "Missing required fields" });
            }

            const newTeam = await db.Teams.create({
                team_name,
                club_id,
                group_id,
                coach_name
            });

            logs.info(`Successfully created team with ID: ${newTeam.team_id}`);
            res.status(201).json(newTeam);
        } catch (error) {
            logs.error("Error creating team", { error: error.message, data: req.body });
            res.status(500).json({ message: "Internal server error" });
        }
    },
    updateTeam: async (req, res) => {
        try {
            logs.info(`Updating team with ID: ${req.params.id}`, { data: req.body });
            const { name, city, country } = req.body;
            const team = await db.Teams.findByPk(req.params.id);
            if (!team) {
                logs.warn(`Team with ID: ${req.params.id} not found for update`);
                return res.status(404).json({ message: "Team not found" });
            }
            team.name = name;
            team.city = city;
            team.country = country;
            await team.save();
            logs.info(`Successfully updated team with ID: ${req.params.id}`);
            res.status(200).json(team);
        } catch (error) {
            logs.error(`Error updating team with ID: ${req.params.id}`, { error: error.message, data: req.body });
            res.status(500).json({ message: "Internal server error" });
        }
    },
    deleteTeam: async (req, res) => {
        try {
            logs.info(`Deleting team with ID: ${req.params.id}`);
            const team = await db.Teams.findByPk(req.params.id);
            if (!team) {
                logs.warn(`Team with ID: ${req.params.id} not found for deletion`);
                return res.status(404).json({ message: "Team not found" });
            }
            await team.destroy();
            logs.info(`Successfully deleted team with ID: ${req.params.id}`);
            res.status(204).send("Successfully deleted team");
        } catch (error) {
            logs.error(`Error deleting team with ID: ${req.params.id}`, { error: error.message });
            res.status(500).json({ message: "Internal server error" });
        }
    },
}