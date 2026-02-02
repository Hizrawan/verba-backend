import * as progressRepo from "../repositories/progress.repository.js";

export const createProgress = (data) => progressRepo.createProgress(data);
export const getAllProgress = () => progressRepo.getAllProgress();
export const getProgressById = (id) => progressRepo.getProgressById(id);
export const getProgressByUser = (userId) => progressRepo.getProgressByUser(userId);
export const getProgressByLesson = (lessonId) =>
  progressRepo.getProgressByLesson(lessonId);
export const updateProgress = (id, updates) =>
  progressRepo.updateProgress(id, updates);
export const deleteProgress = (id) => progressRepo.deleteProgress(id);
