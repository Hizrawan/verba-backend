import { Exam } from "../models/exam.model.js";

export const createExam = async (data) => Exam.create(data);
export const getAllExams = async () => Exam.findAll();
export const getExamById = async (id) => Exam.findByPk(id);
export const updateExam = async (id, updates) =>
  Exam.update(updates, { where: { id }, returning: true });
export const deleteExam = async (id) => Exam.destroy({ where: { id } });
