import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import { User } from './User.js';

export const Reward = sequelize.define('Reward', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER, references: { model: 'Users', key: 'id' } },
  xp: { type: DataTypes.INTEGER, defaultValue: 0 },
  source: { type: DataTypes.STRING(100) }
}, { timestamps: true });

User.hasMany(Reward, { foreignKey: 'user_id' });
Reward.belongsTo(User, { foreignKey: 'user_id' });
