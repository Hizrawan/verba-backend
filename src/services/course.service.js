
import Course from "../repositories/course.repository.js";

export const getAllCourses = async () => {
  return await Course.findAll();
};

export const createCourse = async (data) => {
  return await Course.create(data);
};
