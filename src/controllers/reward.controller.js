import * as rewardService from '../services/reward.service.js';

export const createReward = async (req, res, next) => {
  try { const reward = await rewardService.createReward(req.body); res.status(201).json(reward); }
  catch (err) { next(err); }
};

export const getRewardsByUser = async (req, res, next) => {
  try { const rewards = await rewardService.getRewardsByUser(req.params.userId); res.json(rewards); }
  catch (err) { next(err); }
};
