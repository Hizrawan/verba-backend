import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import { User } from './user.model.js';
import { Lesson } from './lesson.model.js';
import { Course } from './course.model.js';

export const ProgressHistory = sequelize.define('ProgressHistory', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  course_id: { type: DataTypes.INTEGER, allowNull: true },
  lesson_id: { type: DataTypes.INTEGER, allowNull: false },
  score: { type: DataTypes.INTEGER, defaultValue: 0 },
  wrong_count: { type: DataTypes.INTEGER, defaultValue: 0 },
  xp_gained: { type: DataTypes.INTEGER, defaultValue: 0 },
  completed_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { tableName: 'ProgressHistories', timestamps: true });

User.hasMany(ProgressHistory, { foreignKey: 'user_id' });
Lesson.hasMany(ProgressHistory, { foreignKey: 'lesson_id' });
Course.hasMany(ProgressHistory, { foreignKey: 'course_id' });
ProgressHistory.belongsTo(User, { foreignKey: 'user_id' });
ProgressHistory.belongsTo(Lesson, { foreignKey: 'lesson_id' });
ProgressHistory.belongsTo(Course, { foreignKey: 'course_id' });
