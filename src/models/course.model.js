import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

export const Course = sequelize.define('Course', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
}, { timestamps: true });
