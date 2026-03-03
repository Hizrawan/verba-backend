import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import { Lesson } from './lesson.model.js';

export const LessonQuestion = sequelize.define('LessonQuestion', {
  id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
  lesson_id: { type: DataTypes.BIGINT, allowNull: false },
  question_order: { type: DataTypes.INTEGER, allowNull: false },
  prompt: { type: DataTypes.TEXT, allowNull: false },
  explanation: { type: DataTypes.TEXT },
}, { tableName: 'LessonQuestions', timestamps: true });

Lesson.hasMany(LessonQuestion, { foreignKey: 'lesson_id', as: 'questions' });
LessonQuestion.belongsTo(Lesson, { foreignKey: 'lesson_id' });
