import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import verifyRoutes from "./routes/verify.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// connect DB
connectDB();

// 🔥 THIS LINE IS CRITICAL
app.use("/api", verifyRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
