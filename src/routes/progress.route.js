import express from "express";
import {
  createProgress,
  deleteProgress,
  getAllProgress,
  getProgressById,
  getProgressByLesson,
  getProgressByUser,
  updateProgress,
} from "../controllers/progress.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getAllProgress);
router.get("/user/:userId", getProgressByUser);
router.get("/lesson/:lessonId", getProgressByLesson);
router.get("/:id", getProgressById);

router.post("/", authenticate, createProgress);
router.put("/:id", authenticate, updateProgress);
router.delete("/:id", authenticate, deleteProgress);

export default router;
