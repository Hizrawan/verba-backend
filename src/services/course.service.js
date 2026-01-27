
import * as courseRepo from "../repositories/course.repository.js";

export async function createCourse({ title, description }) {
  if (!title) throw new Error("Title cannot be blank");

  const course = await courseRepo.insertCourse({ title, description });
  return course;
}