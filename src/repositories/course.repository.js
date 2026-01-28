import { Course } from '../models/course.model.js';

export const createCourse = async (data) => Course.create(data);
export const getAllCourses = async () => Course.findAll();
export const getCourseById = async (id) => Course.findByPk(id);
export const updateCourse = async (id, updates) => Course.update(updates, { where: { id }, returning: true });
export const deleteCourse = async (id) => Course.destroy({ where: { id } });
