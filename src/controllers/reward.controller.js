import * as rewardService from "../services/reward.service.js";

export const createReward = async (req, res, next) => {
  try {
    const reward = await rewardService.createReward(req.body);
    res.status(201).json(reward);
  } catch (err) {
    next(err);
  }
};

export const getAllRewards = async (_req, res, next) => {
  try {
    const rewards = await rewardService.getAllRewards();
    res.json(rewards);
  } catch (err) {
    next(err);
  }
};

export const getRewardById = async (req, res, next) => {
  try {
    const reward = await rewardService.getRewardById(req.params.id);
    res.json(reward);
  } catch (err) {
    next(err);
  }
};

export const getRewardsByUser = async (req, res, next) => {
  try {
    const rewards = await rewardService.getRewardsByUser(req.params.userId);
    res.json(rewards);
  } catch (err) {
    next(err);
  }
};

export const updateReward = async (req, res, next) => {
  try {
    const updated = await rewardService.updateReward(req.params.id, req.body);
    res.json(updated[1][0]);
  } catch (err) {
    next(err);
  }
};

export const deleteReward = async (req, res, next) => {
  try {
    await rewardService.deleteReward(req.params.id);
    res.json({ message: "Reward deleted" });
  } catch (err) {
    next(err);
  }
};
