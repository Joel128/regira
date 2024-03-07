import { DataTypes } from 'sequelize';
import sequelize from '../database/database.js';
const Issues = sequelize.define('issues', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  desc: {
    type: DataTypes.STRING,
    allowNull: false
  },
  issue_type: {
    type: DataTypes.ENUM("bug", "task", "story"),
    allowNull: false
  },
  priority: {
    type: DataTypes.ENUM("low", "medium", "high"),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM("open", "closed"),
  },
}, {
  timestamps: true, // Agrega automáticamente createdAt y updatedAt
});


export default Issues;
