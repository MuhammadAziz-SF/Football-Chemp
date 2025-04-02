import db from "../models/index.js";

export const PlayersController = {
    getAllPlayers: async (req, res) => {
        try {
            const players = await db.Players.findAll();
            res.status(200).json(players);
        } catch (error) {
            res.status(500).json({ message: "Error retrieving players", error });
        }
    },
    getPlayerByID: async (req, res) => {
        const { id } = req.params;
        try {
            const player = await db.Players.findByPk(id);
            if (!player) {
                return res.status(404).json({ message: "Player not found" });
            }
            res.status(200).json(player);
        } catch (error) {
            res.status(500).json({ message: "Error retrieving player", error });
        }
    },
    createPlayer: async (req, res) => {
        const { name, age, team } = req.body;
        try {
            const newPlayer = await db.Players.create({ name, age, team });
            res.status(201).json(newPlayer);
        } catch (error) {
            res.status(500).json({ message: "Error creating player", error });
        }
    },
    updatePlayer: async (req, res) => {
        const { id } = req.params;
        const { name, age, team } = req.body;
        try {
            const player = await db.Players.findByPk(id);
            if (!player) {
                return res.status(404).json({ message: "Player not found" });
            }
            await player.update({ name, age, team });
            res.status(200).json(player);
        } catch (error) {
            res.status(500).json({ message: "Error updating player", error });
        }
    },
    deletePlayer: async (req, res) => {
        const { id } = req.params;
        try {
            const player = await db.Players.findByPk(id);
            if (!player) {
                return res.status(404).json({ message: "Player not found" });
            }
            await player.destroy();
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: "Error deleting player", error });
        }
    },
}