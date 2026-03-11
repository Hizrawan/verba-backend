import * as examRepo from "../repositories/exam.repository.js";

export const createExam = (data) => examRepo.createExam(data);
export const getAllExams = () => examRepo.getAllExams();
export const getExamById = (id) => examRepo.getExamById(id);
export const getExamsByLesson = (lessonId) => examRepo.getExamsByLesson(lessonId);
export const updateExam = async (id, updates) => {
  await examRepo.updateExam(id, updates);
  return examRepo.getExamById(id);
};
export const deleteExam = (id) => examRepo.deleteExam(id);
