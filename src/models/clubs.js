import { DataTypes } from "sequelize";

export default (sequelize) => {
    const Clubs = sequelize.define(
        "Clubs",
        {
            club_id: {
                type: DataTypes.UUID,
                primaryKey: true,
                field: "club_id",
            },
            clubName: {
                type: DataTypes.STRING(100),
                allowNull: false,
                unique: true,
                field: "club_name",
            },
            city: {
                type: DataTypes.STRING(100),
                allowNull: false,
                field: "city",
            },
            country: {
                type: DataTypes.STRING(100),
                allowNull: false,
                field: "country",
            },
            founded_year: {
                type: DataTypes.INTEGER,
                allowNull: true,
                field: "founded_year",

            }
        })
    return Clubs;
}