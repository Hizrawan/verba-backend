import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import { LessonQuestion } from './lessonQuestion.model.js';

export const LessonQuestionOption = sequelize.define('LessonQuestionOption', {
  id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
  question_id: { type: DataTypes.BIGINT, allowNull: false },
  option_order: { type: DataTypes.INTEGER, allowNull: false },
  option_text: { type: DataTypes.TEXT, allowNull: false },
  is_correct: { type: DataTypes.BOOLEAN, defaultValue: false },
}, { tableName: 'LessonQuestionOptions', timestamps: true });

LessonQuestion.hasMany(LessonQuestionOption, { foreignKey: 'question_id', as: 'options' });
LessonQuestionOption.belongsTo(LessonQuestion, { foreignKey: 'question_id' });
