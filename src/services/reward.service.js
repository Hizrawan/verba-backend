import * as rewardRepo from '../repositories/reward.repository.js';

export const createReward = (data) => rewardRepo.createReward(data);
export const getRewardsByUser = (userId) => rewardRepo.getRewardsByUser(userId);
export const updateReward = (id, updates) => rewardRepo.updateReward(id, updates);
