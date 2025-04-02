import { DataTypes } from "sequelize";

export default (sequelize) => {
    const teams = sequelize.define(
        'teams', 
        {
            team_id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
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

        }, {
            tableName: 'teams',
            timestamps: false
        });     
    return teams;
};