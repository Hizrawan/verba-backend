
import * as progressService from "../services/progress.service.js";

export const getProgress = async (req, res, next) => {
  try {
    const progress = await progressService.getAllProgress();
    res.json(progress);
  } catch (err) { next(err); }
};

export const createProgress = async (req, res, next) => {
  try {
    const progress = await progressService.createProgress(req.body);
    res.status(201).json(progress);
  } catch (err) { next(err); }
};
