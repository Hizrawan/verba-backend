import { Reward } from '../models/reward.model.js';

export const createReward = async (data) => Reward.create(data);
export const getRewardsByUser = async (userId) => Reward.findAll({ where: { user_id: userId } });
export const updateReward = async (id, updates) => Reward.update(updates, { where: { id }, returning: true });
