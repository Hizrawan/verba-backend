import * as examRepo from "../repositories/exam.repository.js";

export const createExam = (data) => examRepo.createExam(data);
export const getAllExams = () => examRepo.getAllExams();
export const getExamById = (id) => examRepo.getExamById(id);
export const updateExam = (id, updates) => examRepo.updateExam(id, updates);
export const deleteExam = (id) => examRepo.deleteExam(id);
