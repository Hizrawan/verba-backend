import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import { Course } from './Course.js';

export const Lesson = sequelize.define('Lesson', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  course_id: { type: DataTypes.INTEGER, references: { model: 'Courses', key: 'id' } },
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT },
  order: { type: DataTypes.INTEGER, defaultValue: 0 }
}, { timestamps: true });

Course.hasMany(Lesson, { foreignKey: 'course_id' });
Lesson.belongsTo(Course, { foreignKey: 'course_id' });
