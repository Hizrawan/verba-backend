import { Progress } from "../models/progress.model.js";

export const createProgress = async (data) => Progress.create(data);
export const getAllProgress = async () => Progress.findAll();
export const getProgressById = async (id) => Progress.findByPk(id);
export const getProgressByUser = async (userId) =>
  Progress.findAll({ where: { user_id: userId } });
export const getProgressByLesson = async (lessonId) =>
  Progress.findAll({ where: { lesson_id: lessonId } });
export const updateProgress = async (id, updates) =>
  Progress.update(updates, { where: { id }, returning: true });
export const deleteProgress = async (id) => Progress.destroy({ where: { id } });
