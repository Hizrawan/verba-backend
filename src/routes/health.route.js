import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
res.json({ status: "ok", message: "PRODUCTION API WORKING PROPERLY" });  
});

export default router;
