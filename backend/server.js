// backend/server.js
import express from "express";
import cors from "cors";
import router from "./routes/musicRoutes.js";

const app = express();
app.use(express.json());

app.use(cors());
app.get("/", (req, res) => res.send("Emotion Music Backend is running ✅"));

app.use('/api/music', router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));