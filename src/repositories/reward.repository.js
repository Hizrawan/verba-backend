import { Reward } from "../models/reward.model.js";

export const createReward = async (data) => Reward.create(data);
export const getAllRewards = async () => Reward.findAll();
export const getRewardById = async (id) => Reward.findByPk(id);
export const getRewardsByUser = async (userId) =>
  Reward.findAll({ where: { user_id: userId } });
export const updateReward = async (id, updates) =>
  Reward.update(updates, { where: { id }, returning: true });
export const deleteReward = async (id) => Reward.destroy({ where: { id } });
