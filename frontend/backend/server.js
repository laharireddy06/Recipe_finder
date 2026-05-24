import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import recipeRoutes from "./routes/recipeRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();

const app = express();


// ======================
// 🔥 CORS CONFIG (FIXED)
// ======================
app.use(cors({
  origin: "https://recipe-finder-1-vryl.onrender.com",
  credentials: true
}));


// ======================
// Middleware
// ======================
app.use(express.json());


// ======================
// Routes
// ======================
app.use("/api/recipes", recipeRoutes);
app.use("/auth", authRoutes);
app.use("/api/ai", aiRoutes);


// ======================
// Health Check Route
// ======================
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});


// ======================
// MongoDB Connection
// ======================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));


// ======================
// Start Server
// ======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});