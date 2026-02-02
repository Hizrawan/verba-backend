import * as rewardRepo from "../repositories/reward.repository.js";

export const createReward = (data) => rewardRepo.createReward(data);
export const getAllRewards = () => rewardRepo.getAllRewards();
export const getRewardById = (id) => rewardRepo.getRewardById(id);
export const getRewardsByUser = (userId) => rewardRepo.getRewardsByUser(userId);
export const updateReward = (id, updates) => rewardRepo.updateReward(id, updates);
export const deleteReward = (id) => rewardRepo.deleteReward(id);
