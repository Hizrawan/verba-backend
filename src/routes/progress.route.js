import express from "express";
import {
  createProgress,
  deleteProgress,
  getAllProgress,
  getProgressById,
  getProgressByLesson,
  getProgressByUser,
  getLessonStatus,
  getCourseSummary,
  getProgressHistory,
  syncProgress,
  recordWrongAnswersBulk,
  updateProgress,
} from "../controllers/progress.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/lesson/:lessonId/status", authenticate, getLessonStatus);
router.get("/course/:courseId", authenticate, getCourseSummary);
router.get("/history", authenticate, getProgressHistory);
router.get("/", getAllProgress);
router.get("/user/:userId", getProgressByUser);
router.get("/lesson/:lessonId", getProgressByLesson);
router.get("/:id", getProgressById);

router.post("/sync", authenticate, syncProgress);
router.post("/wrong-answers/bulk", authenticate, recordWrongAnswersBulk);
router.post("/", authenticate, createProgress);
router.put("/:id", authenticate, updateProgress);
router.delete("/:id", authenticate, deleteProgress);

export default router;
