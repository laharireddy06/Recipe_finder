import express from "express";
import Recipe from "../models/Recipe.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching recipes" });
  }
});

export default router;
