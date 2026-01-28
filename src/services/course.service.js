import * as courseRepo from '../repositories/course.repository.js';

export const createCourse = (data) => courseRepo.createCourse(data);
export const getAllCourses = () => courseRepo.getAllCourses();
export const getCourseById = (id) => courseRepo.getCourseById(id);
export const updateCourse = (id, updates) => courseRepo.updateCourse(id, updates);
export const deleteCourse = (id) => courseRepo.deleteCourse(id);
