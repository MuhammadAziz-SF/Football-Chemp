import { DataTypes } from "sequelize";

export default (sequelize) => {
    const matchFixtures = sequelize.define("match_fixtures",
        {
            matchId: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
                field: "match_id",
            },
            matchDate: {
                type: DataTypes.DATE,
                allowNull: false,
                field: "match_date",
            },
            venue: {
                type: DataTypes.STRING,
                field: "venue",
            },
            homeTeamId: {
                type: DataTypes.UUID,
                allowNull: false,
                field: "home_team_id",
                references: {
                    model: "teams",
                    key: "team_id",
                }
            },
            awayTeamId: {
                type: DataTypes.UUID,
                allowNull: false,
                field: "away_team_id",
                references: {
                    model: "teams",
                    key: "team_id",
                }
            },
            tournamentId: {
                type: DataTypes.UUID,
                allowNull: false,
                field: "tournament_id",
                references: {
                    model: "tournaments",
                    key: "tournament_id",
                }
            },
            homeScore: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
                field: "home_score",
            },
            awayScore: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
                field: "away_score",
            },
            matchStatus: {
                type: DataTypes.STRING,
                allowNull: false,
                field: "match_status",
            }
        }, {
            tableName: 'match_fixtures',
            timestamps: false
        });
    return matchFixtures;
};