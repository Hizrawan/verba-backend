import express from "express";
import {
  createReward,
  deleteReward,
  getAllRewards,
  getRewardById,
  getRewardsByUser,
  updateReward,
} from "../controllers/reward.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getAllRewards);
router.get("/user/:userId", getRewardsByUser);
router.get("/:id", getRewardById);

router.post("/", authenticate, createReward);
router.put("/:id", authenticate, updateReward);
router.delete("/:id", authenticate, deleteReward);

export default router;
