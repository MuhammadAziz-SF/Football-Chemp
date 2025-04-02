import db from "../models/index.js";
import logs from "../config/logs.js";

export const PlayersController = {
    getAllPlayers: async (req, res) => {
        try {
            logs.info("Fetching all players");
            const players = await db.Players.findAll();
            logs.info(`Successfully retrieved ${players.length} players`);
            res.status(200).json(players);
        } catch (error) {
            logs.error("Error retrieving players", { error: error.message });
            res.status(500).json({ message: "Error retrieving players", error });
        }
    },
    getPlayerByID: async (req, res) => {
        const { id } = req.params;
        try {
            logs.info(`Fetching player with ID: ${id}`);
            const player = await db.Players.findByPk(id);
            if (!player) {
                logs.warn(`Player with ID: ${id} not found`);
                return res.status(404).json({ message: "Player not found" });
            }
            logs.info(`Successfully retrieved player with ID: ${id}`);
            res.status(200).json(player);
        } catch (error) {
            logs.error(`Error retrieving player with ID: ${id}`, { error: error.message });
            res.status(500).json({ message: "Error retrieving player", error });
        }
    },
    createPlayer: async (req, res) => {
        try {
            logs.info("Creating new player", { data: req.body });
            const { full_name, date_of_birth, position, team_id, jersey_number } = req.body;
            
            if (!full_name || !date_of_birth || !position || !team_id || !jersey_number) {
                logs.warn("Missing required fields in player creation request");
                return res.status(400).json({ message: "Missing required fields" });
            }

            const newPlayer = await db.Players.create({
                full_name,
                date_of_birth,
                position,
                team_id,
                jersey_number
            });

            logs.info(`Successfully created player with ID: ${newPlayer.player_id}`);
            res.status(201).json(newPlayer);
        } catch (error) {
            logs.error("Error creating player", { error: error.message, data: req.body });
            res.status(500).json({ message: "Error creating player", error });
        }
    },
    updatePlayer: async (req, res) => {
        const { id } = req.params;
        const { name, age, team } = req.body;
        try {
            logs.info(`Updating player with ID: ${id}`, { data: req.body });
            const player = await db.Players.findByPk(id);
            if (!player) {
                logs.warn(`Player with ID: ${id} not found for update`);
                return res.status(404).json({ message: "Player not found" });
            }
            await player.update({ name, age, team });
            logs.info(`Successfully updated player with ID: ${id}`);
            res.status(200).json(player);
        } catch (error) {
            logs.error(`Error updating player with ID: ${id}`, { error: error.message, data: req.body });
            res.status(500).json({ message: "Error updating player", error });
        }
    },
    deletePlayer: async (req, res) => {
        const { id } = req.params;
        try {
            logs.info(`Deleting player with ID: ${id}`);
            const player = await db.Players.findByPk(id);
            if (!player) {
                logs.warn(`Player with ID: ${id} not found for deletion`);
                return res.status(404).json({ message: "Player not found" });
            }
            await player.destroy();
            logs.info(`Successfully deleted player with ID: ${id}`);
            res.status(204).send("Successfully deleted player");
        } catch (error) {
            logs.error(`Error deleting player with ID: ${id}`, { error: error.message });
            res.status(500).json({ message: "Error deleting player", error });
        }
    },
}