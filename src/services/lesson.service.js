import * as lessonRepo from '../repositories/lesson.repository.js';

const normalizePayload = (payload) => {
  const normalized = { ...payload };
  if (normalized.order !== undefined && normalized.lesson_order === undefined) {
    normalized.lesson_order = normalized.order;
    delete normalized.order;
  }
  return normalized;
};

export const createLesson = (data) => lessonRepo.createLesson(normalizePayload(data));
export const getLessonsByCourse = (courseId) => lessonRepo.getLessonsByCourseId(courseId);
export const getLessonById = (id) => lessonRepo.getLessonById(id);
export const updateLesson = (id, updates) => lessonRepo.updateLesson(id, normalizePayload(updates));
export const deleteLesson = (id) => lessonRepo.deleteLesson(id);
