import express from "express";
import auth from "../middleware/auth.js";
import User from "../models/User.js";

const router = express.Router();

router.post("/:recipeId", auth, async (req, res) => {
  const user = await User.findById(req.userId);

  if (!user.favorites.includes(req.params.recipeId)) {
    user.favorites.push(req.params.recipeId);
    await user.save();
  }

  res.json({ message: "Added to favorites" });
});

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.userId).populate("favorites");
  res.json(user.favorites);
});

export default router;
