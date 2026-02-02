import express from "express";
import {
  createExam,
  deleteExam,
  getAllExams,
  getExamById,
  updateExam,
} from "../controllers/exam.controller.js";
import { addQuestions } from "../controllers/examQuestion.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getAllExams);
router.get("/:id", getExamById);
router.post("/:id/questions", authenticate, addQuestions);

router.post("/", authenticate, createExam);
router.put("/:id", authenticate, updateExam);
router.delete("/:id", authenticate, deleteExam);

export default router;
