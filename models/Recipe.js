import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
  title: String,

  ingredients: {
    type: [String], // ✅ ARRAY
    required: true
  },

  instructions: {
    type: [String],
    required: true
  },

  image_url: String,
  youtube_url: String,

  type: {
    type: String,
    enum: ["veg", "non-veg"]
  },

  cooking_time: Number, // ✅ match DB
  difficulty: String
});

export default mongoose.model("Recipe", RecipeSchema);
