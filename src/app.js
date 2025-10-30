import express from "express";
import authRoutes from "./routes/authRoutes.js";
import offerRoutes from "./routes/offerRoutes.js";
import leadRoutes from "./routes/leadRoutes.js";
import scoreRoutes from "./routes/scoreRoutes.js";


const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/offer", offerRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/score/offer", scoreRoutes);
app.use('/api/score', scoreRoutes )


app.get("/", (req, res) => res.send("Lead Scoring API running 🚀"));

export default app;
