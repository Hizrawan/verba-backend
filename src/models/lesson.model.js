import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import { Course } from '../models/course.model.js';


export const Lesson = sequelize.define('Lesson', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  course_id: { type: DataTypes.INTEGER, references: { model: 'Courses', key: 'id' } },
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT },
  order: { type: DataTypes.INTEGER, defaultValue: 0 }
}, { timestamps: true });

Course.hasMany(Lesson, { foreignKey: 'course_id' });
Lesson.belongsTo(Course, { foreignKey: 'course_id' });
