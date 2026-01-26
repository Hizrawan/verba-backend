import express from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { getAllUsers, getUserById, updateUser, deleteUser } from "../controllers/user.controller.js";

const router = express.Router();

// Semua route di sini protected, pakai Firebase Auth
router.use(authenticate);

// GET semua user
router.get("/", getAllUsers);

// GET user by ID
router.get("/:id", getUserById);

// PUT update user
router.put("/:id", updateUser);

// DELETE user
router.delete("/:id", deleteUser);

export default router;
