import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ port: process.env.PORT || 3000 || "production"});
});

export default router;
