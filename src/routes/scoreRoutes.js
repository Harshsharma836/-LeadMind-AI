import express from "express";
import { scoreLeads, getScoreLeads } from "../controllers/scoreController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/:offerId", scoreLeads);
router.get("/scores", getScoreLeads);

export default router;
