import * as progressService from "../services/progress.service.js";

export const createProgress = async (req, res, next) => {
  try {
    const progress = await progressService.createProgress(req.body);
    res.status(201).json(progress);
  } catch (err) {
    next(err);
  }
};

export const getAllProgress = async (_req, res, next) => {
  try {
    const progress = await progressService.getAllProgress();
    res.json(progress);
  } catch (err) {
    next(err);
  }
};

export const getProgressById = async (req, res, next) => {
  try {
    const progress = await progressService.getProgressById(req.params.id);
    res.json(progress);
  } catch (err) {
    next(err);
  }
};

export const getProgressByUser = async (req, res, next) => {
  try {
    const progress = await progressService.getProgressByUser(req.params.userId);
    res.json(progress);
  } catch (err) {
    next(err);
  }
};

export const getProgressByLesson = async (req, res, next) => {
  try {
    const progress = await progressService.getProgressByLesson(
      req.params.lessonId
    );
    res.json(progress);
  } catch (err) {
    next(err);
  }
};

export const updateProgress = async (req, res, next) => {
  try {
    const updated = await progressService.updateProgress(
      req.params.id,
      req.body
    );
    res.json(updated[1][0]);
  } catch (err) {
    next(err);
  }
};

export const deleteProgress = async (req, res, next) => {
  try {
    await progressService.deleteProgress(req.params.id);
    res.json({ message: "Progress deleted" });
  } catch (err) {
    next(err);
  }
};
