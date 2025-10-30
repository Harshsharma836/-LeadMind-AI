import express from "express";
import { upload } from "../middleware/upload.js";
import { uploadLeads } from "../controllers/leadController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/upload", upload.single("file"), uploadLeads);
export default router;
