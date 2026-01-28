import { Lesson } from '../models/Lesson.js';

export const createLesson = async (data) => Lesson.create(data);
export const getLessonsByCourseId = async (courseId) => Lesson.findAll({ where: { course_id: courseId } });
export const getLessonById = async (id) => Lesson.findByPk(id);
export const updateLesson = async (id, updates) => Lesson.update(updates, { where: { id }, returning: true });
export const deleteLesson = async (id) => Lesson.destroy({ where: { id } });
