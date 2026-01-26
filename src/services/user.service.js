
import User from "../repositories/user.repository.js";

export const getUserByUid = async (uid) => {
  return await User.findOne({ where: { uid } });
};
