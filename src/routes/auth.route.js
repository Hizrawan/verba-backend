import express from "express";
const router = express.Router();
import { registerUser } from '../controllers/auth.controller.js';

router.post('/register', registerUser);

router.get("/", (req, res) => {
  res.json({ status: "ok" });
});

export default router;
