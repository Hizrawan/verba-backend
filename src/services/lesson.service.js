import * as lessonRepo from '../repositories/lesson.repository.js';

export const createLesson = (data) => lessonRepo.createLesson(data);
export const getLessonsByCourse = (courseId) => lessonRepo.getLessonsByCourseId(courseId);
export const getLessonById = (id) => lessonRepo.getLessonById(id);
export const updateLesson = (id, updates) => lessonRepo.updateLesson(id, updates);
export const deleteLesson = (id) => lessonRepo.deleteLesson(id);
