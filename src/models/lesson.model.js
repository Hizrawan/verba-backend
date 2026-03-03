import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import { Course } from '../models/course.model.js';

export const Lesson = sequelize.define('Lesson', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  course_id: { type: DataTypes.INTEGER, references: { model: 'Courses', key: 'id' } },
  title: { type: DataTypes.STRING, allowNull: false },
  type: { type: DataTypes.ENUM('material', 'flashcard', 'multiple_choice'), defaultValue: 'material' },
  content: { type: DataTypes.TEXT },
  lesson_order: { type: DataTypes.INTEGER, defaultValue: 0, field: 'lesson_order' }
}, { timestamps: true });

Course.hasMany(Lesson, { foreignKey: 'course_id' });
Lesson.belongsTo(Course, { foreignKey: 'course_id' });
