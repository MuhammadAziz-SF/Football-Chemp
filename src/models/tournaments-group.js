import { DataTypes, Model } from "sequelize";
import tournament from "./tournament";

export default (sequelize) => {
    const TournamentsGroup = sequelize.define(
        'TournamentsGroup',
    {
        group_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUID,
            primaryKey: true,
            field: 'group_id'
        },
        groupName: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            field: 'group_name'
        },
        tournament_id: {
            type: DataTypes.UUID,
            primaryKey: true,
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
            field: 'created_at'
        }
    });

    return TournamentsGroup;
};