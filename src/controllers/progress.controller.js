import * as progressService from '../services/progress.service.js';

export const createProgress = async (req, res, next) => {
  try { const progress = await progressService.createProgress(req.body); res.status(201).json(progress); }
  catch (err) { next(err); }
};

export const getProgressByUser = async (req, res, next) => {
  try { const progress = await progressService.getProgressByUser(req.params.userId); res.json(progress); }
  catch (err) { next(err); }
};
