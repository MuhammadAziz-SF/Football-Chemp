import db from "../models/index.js";
import logs from "../config/logs.js";

export const TournamentsGroupController = {
    getAllTournamentsGroup: async (req, res) => {
        try {
            logs.info("Fetching all tournament groups");
            const tournamentsGroup = await db.Tournament_groups.findAll();
            logs.info(`Successfully retrieved ${tournamentsGroup.length} tournament groups`);
            res.status(200).json(tournamentsGroup);
        } catch (error) {
            logs.error("Error fetching tournament groups", { error: error.message });
            res.status(500).json({ message: "Internal server error" });
        }
    },
    getTournamentsGroupById: async (req, res) => {
        try {
            logs.info(`Fetching tournament group with ID: ${req.params.id}`);
            const tournamentsGroup = await db.Tournament_groups.findByPk(req.params.id);
            if (!tournamentsGroup) {
                logs.warn(`Tournament group with ID: ${req.params.id} not found`);
                return res.status(404).json({ message: "Tournaments group not found" });
            }
            logs.info(`Successfully retrieved tournament group with ID: ${req.params.id}`);
            res.status(200).json(tournamentsGroup);
        } catch (error) {
            logs.error(`Error fetching tournament group with ID: ${req.params.id}`, { error: error.message });
            res.status(500).json({ message: "Internal server error" });
        }
    },
    createTournamentsGroup: async (req, res) => {
        try {
            logs.info("Creating new tournament group", { data: req.body });
            const { groupName, tournamentId } = req.body;
            
            if (!groupName || !tournamentId) {
                logs.warn("Missing required fields", { groupName, tournamentId });
                return res.status(400).json({ message: "Group name and tournament ID are required" });
            }

            const newTournamentsGroup = await db.Tournament_groups.create({
                groupName: groupName,
                tournament_id: tournamentId
            });

            logs.info(`Successfully created tournament group with ID: ${newTournamentsGroup.group_id}`);
            res.status(201).json({
                success: true,
                data: newTournamentsGroup
            });
        } catch (error) {
            logs.error("Error creating tournament group", { error: error.message, data: req.body });
            
            // Handle unique constraint violations
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(409).json({ message: "Group name already exists for this tournament" });
            }

            res.status(500).json({ message: "Internal server error" });
        }
    },
    updateTournamentsGroup: async (req, res) => {
        try {
            logs.info(`Updating tournament group with ID: ${req.params.id}`, { data: req.body });
            const { groupName, tournamentId } = req.body;

            if (!groupName) {
                logs.warn("Missing required field", { groupName });
                return res.status(400).json({ message: "Group name is required" });
            }

            const tournamentsGroup = await db.Tournament_groups.findByPk(req.params.id);
            if (!tournamentsGroup) {
                logs.warn(`Tournament group with ID: ${req.params.id} not found for update`);
                return res.status(404).json({ message: "Tournaments group not found" });
            }

            tournamentsGroup.groupName = groupName;
            if (tournamentId) {
                tournamentsGroup.tournament_id = tournamentId;
            }

            await tournamentsGroup.save();
            logs.info(`Successfully updated tournament group with ID: ${req.params.id}`);
            res.status(200).json({
                success: true,
                data: tournamentsGroup
            });
        } catch (error) {
            logs.error(`Error updating tournament group with ID: ${req.params.id}`, { error: error.message, data: req.body });
            
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(409).json({ message: "Group name already exists for this tournament" });
            }

            res.status(500).json({ message: "Internal server error" });
        }
    },
    deleteTournamentsGroup: async (req, res) => {
        try {
            logs.info(`Deleting tournament group with ID: ${req.params.id}`);
            const tournamentsGroup = await db.Tournament_groups.findByPk(req.params.id);
            if (!tournamentsGroup) {
                logs.warn(`Tournament group with ID: ${req.params.id} not found for deletion`);
                return res.status(404).json({ message: "Tournaments group not found" });
            }
            await tournamentsGroup.destroy();
            logs.info(`Successfully deleted tournament group with ID: ${req.params.id}`);
            res.status(204).send("Successfully deleted tournament group");
        } catch (error) {
            logs.error(`Error deleting tournament group with ID: ${req.params.id}`, { error: error.message });
            res.status(500).json({ message: "Internal server error" });
        }
    },
}