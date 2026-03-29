// routes/aiRoutes.js
import express from "express";
import Recipe from "../models/Recipe.js"; // Make sure your Recipe model is correct
const router = express.Router();

// POST route for AI recipe suggestions
router.post("/suggest", async (req, res) => {
  try {
    const { query } = req.body;

    // 1️⃣ Simple NLP to detect intents
    const lowerQuery = query.toLowerCase();
    const intent = {
      veg: lowerQuery.includes("veg"),
      nonveg: lowerQuery.includes("non-veg") || lowerQuery.includes("non veg"),
      kids: lowerQuery.includes("kids"),
      quick: lowerQuery.includes("quick") || lowerQuery.includes("under 30"),
      words: lowerQuery.split(" "), // tokenized words
    };

    // 2️⃣ Fetch all recipes
    const recipes = await Recipe.find();

    // 3️⃣ Filter recipes based on intent
    const matchedRecipes = recipes.filter((r) => {
      // Veg / Non-veg filter
      if (intent.veg && r.type !== "veg") return false;
      if (intent.nonveg && !r.type?.includes("non")) return false;

      // Kids filter: quick + non-spicy
      if (intent.kids) {
        if (r.cooking_time > 30) return false; // max 30 mins
        if (r.spicy === true) return false;    // avoid spicy
      }

      // Quick filter
      if (intent.quick && r.cooking_time > 30) return false;

      // Partial match in title or ingredients
      const queryString = lowerQuery;
      const titleMatch = r.title.toLowerCase().includes(queryString);
      const ingredientsMatch = Array.isArray(r.ingredients)
        ? r.ingredients.join(" ").toLowerCase().includes(queryString)
        : r.ingredients?.toLowerCase().includes(queryString);

      return titleMatch || ingredientsMatch;
    });

    // 4️⃣ Fallback for kids if no exact match
    if (matchedRecipes.length === 0 && intent.kids) {
      const kidRecipes = recipes.filter(
        (r) => r.cooking_time <= 30 && r.spicy !== true
      ).slice(0, 5); // return max 5 recipes
      return res.json({
        reply: "Here are some kid-friendly quick recipes 🍭",
        matchedRecipes: kidRecipes,
      });
    }

    // 5️⃣ Normal response
    if (matchedRecipes.length === 0) {
      return res.json({ reply: "No recipes found 😢", matchedRecipes: [] });
    }

    return res.json({
      reply: `I found ${matchedRecipes.length} recipe(s) for you!`,
      matchedRecipes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: "Server error" });
  }
});

export default router;
