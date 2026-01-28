import express from "express";
const router = express.Router();
const { registerUser } = require('../controllers/auth.controller');

router.post('/register', registerUser);

router.get("/", (req, res) => {
  res.json({ status: "ok" });
});

export default router;
