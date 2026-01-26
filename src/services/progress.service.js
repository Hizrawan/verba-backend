
import Progress from "../repositories/progress.repository.js";

export const getProgressByUser = async (userId) => {
  return await Progress.findAll({ where: { userId } });
};

export const updateProgress = async (data) => {
  return await Progress.upsert(data);
};
