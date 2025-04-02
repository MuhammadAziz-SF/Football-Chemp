import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Tournament = sequelize.define('Tournament', {
    tournament_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUID,
      primaryKey: true,
      field: 'tournament_id'
    },
    tournamentName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      field: 'tournament_name'
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'start_date'
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'end_date'
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  }, {
    tableName: 'tournaments',
    timestamps: false
  });

  return Tournament;
};