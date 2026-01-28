import { User } from '../models/User.js';

export const createUser = async (data) => User.create(data);
export const findByEmail = async (email) => User.findOne({ where: { email } });
export const findByFirebaseUid = async (uid) => User.findOne({ where: { firebase_uid: uid } });
export const findById = async (id) => User.findByPk(id);
export const updateUser = async (id, updates) => User.update(updates, { where: { id }, returning: true });
export const createUserInDB = async (data) => User.create(data);