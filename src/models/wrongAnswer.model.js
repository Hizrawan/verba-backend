import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import { User } from './user.model.js';
import { Lesson } from './lesson.model.js';
import { Course } from './course.model.js';

export const WrongAnswer = sequelize.define('WrongAnswer', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  course_id: { type: DataTypes.INTEGER, allowNull: true },
  lesson_id: { type: DataTypes.INTEGER, allowNull: false },
  lesson_title: { type: DataTypes.STRING },
  prompt: { type: DataTypes.TEXT },
  user_answer: { type: DataTypes.TEXT },
  correct_answer: { type: DataTypes.TEXT },
  recorded_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { tableName: 'WrongAnswers', timestamps: true });

User.hasMany(WrongAnswer, { foreignKey: 'user_id' });
Lesson.hasMany(WrongAnswer, { foreignKey: 'lesson_id' });
Course.hasMany(WrongAnswer, { foreignKey: 'course_id' });
WrongAnswer.belongsTo(User, { foreignKey: 'user_id' });
WrongAnswer.belongsTo(Lesson, { foreignKey: 'lesson_id' });
WrongAnswer.belongsTo(Course, { foreignKey: 'course_id' });
