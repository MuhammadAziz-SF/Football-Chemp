import { match } from "assert";
import { DataTypes } from "sequelize";

export default (sequelize) => {
    const matchFixtures = sequelize.define("match_fixtures",
        {
            match_id: {
                type: DataTypes.UUID,
                primaryKey: true,
                field: "match_id",
            },
            match_date: {
                type: DataTypes.DATE,
                allowNull: false,
                field: "match_date",
            },
            venue: {
                type: DataTypes.STRING,
                field: "venue",
            },
            home_team_id: {
                type: DataTypes.UUID,
                allowNull: false,
                field: "home_team_id",
                references: {
                    model: "teams",
                    key: "team_id",
                }
            },
            away_team_id: {
                type: DataTypes.UUID,
                allowNull: false,
                field: "away_team_id",
                references: {
                    model: "teams",
                    key: "team_id",
                }
            },
            home_team_score: {
                type: DataTypes.INTEGER,
                field: "home_team_score",
            },
            away_team_score: {
                type: DataTypes.INTEGER,
                field: "away_team_score",
            },
            match_status: {
                type: DataTypes.STRING,
                allowNull: false,
                field: "match_status",
            }
        })
    return matchFixtures;
};