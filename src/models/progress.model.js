import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import { User } from '../models/user.model.js';
import { Lesson } from '../models/lesson.model.js';

export const Progress = sequelize.define('Progress', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER, references: { model: 'Users', key: 'id' } },
  lesson_id: { type: DataTypes.INTEGER, references: { model: 'Lessons', key: 'id' } },
  completed: { type: DataTypes.BOOLEAN, defaultValue: false }
}, { timestamps: true });

User.hasMany(Progress, { foreignKey: 'user_id' });
Lesson.hasMany(Progress, { foreignKey: 'lesson_id' });
Progress.belongsTo(User, { foreignKey: 'user_id' });
Progress.belongsTo(Lesson, { foreignKey: 'lesson_id' });
