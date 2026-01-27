
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