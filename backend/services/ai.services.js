import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import { AI_SERVICE_URL } from "../config/ai.config.js";

export const analyzeWithAI = async (filePath) => {
  const formData = new FormData();
  formData.append("file", fs.createReadStream(filePath));

  const response = await axios.post(AI_SERVICE_URL, formData, {
    headers: formData.getHeaders(),
  });

  return response.data;
};
