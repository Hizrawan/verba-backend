import * as userRepo from '../repositories/user.repository.js';
import { User } from '../models/user.model.js';

export const createUser = (data) => userRepo.createUser(data);
export const getUserById = (id) => userRepo.findById(id);
export const getUserByEmail = (email) => userRepo.findByEmail(email);
export const updateUser = (id, updates) => userRepo.updateUser(id, updates);
export const createUserInDB = async (data) => User.create(data);
