import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const tournament = sequelize.define('tournaments', {
    tournament_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      field: 'tournament_id'
    },
    tournament_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      field: 'tournament_name'
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'start_date'
    },
    end_date: {
      type: DataTypes.DATE,
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

  return tournament;
};