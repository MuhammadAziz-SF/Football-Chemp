import { DataTypes } from "sequelize";

export default (sequelize) => {
    const clubs = sequelize.define(
        "football_clubs",
        {
            club_id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
                field: "club_id",
            },
            club_name: {
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
        }, {
            tableName: 'football_clubs',
            timestamps: false
        });
    return clubs;
}