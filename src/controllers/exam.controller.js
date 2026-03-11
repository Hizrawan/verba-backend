import * as examService from "../services/exam.service.js";

export const createExam = async (req, res, next) => {
  try {
    const exam = await examService.createExam(req.body);
    res.status(201).json(exam);
  } catch (err) {
    next(err);
  }
};

export const getAllExams = async (_req, res, next) => {
  try {
    const exams = await examService.getAllExams();
    res.json(exams);
  } catch (err) {
    next(err);
  }
};

export const getExamById = async (req, res, next) => {
  try {
    const exam = await examService.getExamById(req.params.id);
    res.json(exam);
  } catch (err) {
    next(err);
  }
};

export const updateExam = async (req, res, next) => {
  try {
    const updated = await examService.updateExam(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteExam = async (req, res, next) => {
  try {
    await examService.deleteExam(req.params.id);
    res.json({ message: "Exam deleted" });
  } catch (err) {
    next(err);
  }
};

export const getExamsByLesson = async (req, res, next) => {
  try {
    const exams = await examService.getExamsByLesson(req.params.lessonId);
    res.json(exams);
  } catch (err) {
    next(err);
  }
};
