import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import { Lesson } from './lesson.model.js';

export const LessonFlashcard = sequelize.define('LessonFlashcard', {
  id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
  lesson_id: { type: DataTypes.BIGINT, allowNull: false },
  card_order: { type: DataTypes.INTEGER, allowNull: false },
  front_text: { type: DataTypes.TEXT, allowNull: false },
  back_text: { type: DataTypes.TEXT, allowNull: false },
}, { tableName: 'LessonFlashcards', timestamps: true });

Lesson.hasMany(LessonFlashcard, { foreignKey: 'lesson_id', as: 'flashcards' });
LessonFlashcard.belongsTo(Lesson, { foreignKey: 'lesson_id' });
