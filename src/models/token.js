import { DataTypes } from "sequelize";

export default (sequelize) => {
    const tokens = sequelize.define("tokens", 
        {
            access_token: {
                type: DataTypes.STRING,
                allowNull: false,
                field: "access_token",
            },
            refresh_token: {
                type: DataTypes.STRING,
                allowNull: false,
                field: "refresh_token",
            },
            expires_at: {
                type: DataTypes.DATE,
                allowNull: false,
                field: "expires_at",
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                field: "created_at",
            }
        })
    return tokens;
};