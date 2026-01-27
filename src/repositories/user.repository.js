import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const User = sequelize.define("User", {
  uid: { type: DataTypes.STRING, allowNull: false, unique: true },
  email: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "user" },
  photo_url: { type: DataTypes.STRING },
});

export default User;
