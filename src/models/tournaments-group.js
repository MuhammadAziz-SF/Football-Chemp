import { DataTypes } from "sequelize";

export default (sequelize) => {
    const tournamentsGroup = sequelize.define(
        'tournament_groups',
    {
        group_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            field: 'group_id'
        },
        groupName: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'group_name'
        },
        tournament_id: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'tournament_id',
            references: {
                model: 'tournaments',
                key: 'tournament_id'
            }
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: 'created_at'
        }
    }, {
        tableName: 'tournament_groups',
        timestamps: false
    }); 

    return tournamentsGroup;
};