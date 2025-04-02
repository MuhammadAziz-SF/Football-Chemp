import db from "../models/index.js";
import logs from "../config/logs.js";

export const ClubsController = {
    getAllClubs: async (req, res) => {
        try {
            logs.info("Fetching all clubs");
            const clubs = await db.Clubs.findAll();
            logs.info(`Successfully retrieved ${clubs.length} clubs`);
            res.status(200).json(clubs);
  res.status(500).js        } catch (error) {
            logs.error("Error retrieving clubs", { error: error.message });
          on({ message: "Error retrieving clubs", error });
        }
    },

    getClubByID: async (req, res) => {
        try {
            logs.info(`Fetching club with ID: ${req.params.id}`);
            const club = await db.Clubs.findByPk(req.params.id);
            if (!club) {
                logs.warn(`Club with ID: ${req.params.id} not found`);
                return res.status(404).json({ message: "Club not found" });
            }
            logs.info(`Successfully retrieved club with ID: ${req.params.id}`);
            res.status(200).json(club);
        } catch (error) {
            logs.error(`Error retrieving club with ID: ${req.params.id}`, { error: error.message });
            res.status(500).json({ message: "Error retrieving club", error });
        }
    },

    createClub: async (req, res) => {
        try {
            const { club_name, city, country, founded_year } = req.body;
            
            if (!club_name || !city || !country) {
                logs.warn("Missing required fields in request body");
                return res.status(400).json({ message: "Club name, city and country are required" });
            }

            logs.info("Creating new club", { data: req.body });
            
            const existingClub = await db.Clubs.findOne({ where: { club_name } });
            if (existingClub) {
                logs.warn(`Club with name ${club_name} already exists`);
                return res.status(409).json({ message: "Club with this name already exists" });
            }

            const club = await db.Clubs.create({
                club_name,
                city, 
                country,
                founded_year
            });

            logs.info(`Successfully created club with ID: ${club.club_id}`);
            res.status(201).json(club);
        } catch (error) {
            logs.error("Error creating club", { error: error.message, data: req.body });
            res.status(500).json({ message: "Error creating club", error: error.message });
        }
    },

    updateClub: async (req, res) => {
        try {
            logs.info(`Updating club with ID: ${req.params.id}`, { data: req.body });
            const club = await db.Clubs.findByPk(req.params.id);
            if (!club) {
                logs.warn(`Club with ID: ${req.params.id} not found for update`);
                return res.status(404).json({ message: "Club not found" });
            }
            await club.update(req.body);
            logs.info(`Successfully updated club with ID: ${req.params.id}`);
            res.status(200).json(club);
        } catch (error) {
            logs.error(`Error updating club with ID: ${req.params.id}`, { error: error.message, data: req.body });
            res.status(500).json({ message: "Error updating club", error });
        }
    },

    deleteClub: async (req, res) => {
        try {
            logs.info(`Deleting club with ID: ${req.params.id}`);
            const club = await db.Clubs.findByPk(req.params.id);
            if (!club) {
                logs.warn(`Club with ID: ${req.params.id} not found for deletion`);
                return res.status(404).json({ message: "Club not found" });
            }
            await club.destroy();
            logs.info(`Successfully deleted club with ID: ${req.params.id}`);
            res.status(204).send("Successfully deleted club");
        } catch (error) {
            logs.error(`Error deleting club with ID: ${req.params.id}`, { error: error.message });
            res.status(500).json({ message: "Error deleting club", error });
        }
    }
};
