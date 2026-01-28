
import User from "../repositories/user.repository.js";

export const getUserByUid = async (uid) => {
  return await User.findOne({ where: { uid } });
};

export const getAllUsers = async () => {
  return await User.findAll({
    attributes: ["id", "firebase_uid", "email", "name", "role", "photo_url", "createdAt", "updatedAt"],
    order: [["createdAt", "DESC"]], 
  });
};

async function createUserInDB(data) {
  return await userRepo.createUser(data);
}

async function getUserByEmail(email) {
  return await userRepo.findByEmail(email);
}

async function getUserByFirebaseUid(uid) {
  return await userRepo.findByFirebaseUid(uid);
}

module.exports = {
  createUserInDB,
  getUserByEmail,
  getUserByFirebaseUid
};