import * as userService from '../services/user.service.js';

export const getUser = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.json(user);
  } catch (err) { next(err); }
};

export const updateUser = async (req, res, next) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.json(user[1][0]); // Sequelize returns [affectedCount, [updatedRow]]
  } catch (err) { next(err); }
};
