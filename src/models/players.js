import { type } from "os";
import { DataTypes } from "sequelize";

export default (sequelize) => {
    const Players = sequelize.define("players", 
        {
            player_id: {
                type: DataTypes.UUID,
                primaryKey: true,
                field: "player_id",
            },
            full_name: {
                type: DataTypes.STRING,
                allowNull: false,
                field: "full_name",
            },
            data_of_birth: {
                type: DataTypes.DATE,
                allowNull: false,
                field: "data_of_birth",
            },
            position: {
                type: DataTypes.STRING,
                allowNull: false,
                field: "position",
            },
            team_id: {
                type: DataTypes.UUID,
                allowNull: false,
                field: "team_id",
                references: {
                    model: "teams",
                    key: "team_id",
                }
            },
            jersey_number: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: "jersey_number",
            }
        })
    return Players;
};
