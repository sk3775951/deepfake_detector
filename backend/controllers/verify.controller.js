import fs from "fs";
import FormData from "form-data";
import axios from "axios";
import { AI_SERVICE_URL } from "../config/ai.config.js";
import Verification from "../models/Verification.js";

export const verifyMedia = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const formData = new FormData();
    formData.append("file", fs.createReadStream(req.file.path));

const aiRes = await axios.post(
  AI_SERVICE_URL,
  formData,
  {
    headers: {
      ...formData.getHeaders()
    }
  }
);

const result = aiRes.data;


    await Verification.create(result);

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Verification failed" });
  }
};
