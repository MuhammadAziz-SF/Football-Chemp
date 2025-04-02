import { DataTypes } from "sequelize";

export default (sequelize) => {
    const Team = sequelize.define(
        'Team', 
        {
            team_id: {
                type: DataTypes.UUID,
                primaryKey: true,
                field: 'team_id',
            },
            team_name: {
                type: DataTypes.STRING(100),
                allowNull: false,
                field: 'team_name',
            },
            club_id: {
                type: DataTypes.UUID,
                allowNull: false,
                field: 'club_id',
                references: {
                    model: 'football_clubs',
                    key: 'club_id',
                },
            },
            group_id: {
                type: DataTypes.UUID,
                allowNull: false,
                field: 'group_id',
                references: {
                    model: 'tournament_groups',
                    key: 'group_id',
                },
            },
            coach_name: {
                type: DataTypes.STRING(100),
                allowNull: false,
                field: 'coach_name',
            },

        });
    return Team;
};