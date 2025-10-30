import express from "express";
import { scoreLeads, getScoreLeads, exportScoreLeads } from "../controllers/scoreController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/:offerId", scoreLeads);
router.get("/scores", getScoreLeads);
router.get("/export", exportScoreLeads);

export default router;
