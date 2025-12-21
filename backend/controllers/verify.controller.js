import { analyzeWithAI } from "../services/ai.services.js";
import Verification from "../models/Verification.js";

export const verifyMedia = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // 🔥 AI prediction
    const aiResult = await analyzeWithAI(req.file.path);

    // Optional: save to DB
    const saved = await Verification.create(aiResult);

    res.json(saved);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Verification failed" });
  }
};
