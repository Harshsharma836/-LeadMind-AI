import express from "express";
import { saveOffer } from "../controllers/offerController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/", saveOffer);
export default router;
