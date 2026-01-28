import * as progressRepo from '../repositories/progress.repository.js';

export const createProgress = (data) => progressRepo.createProgress(data);
export const getProgressByUser = (userId) => progressRepo.getProgressByUser(userId);
export const updateProgress = (id, updates) => progressRepo.updateProgress(id, updates);
