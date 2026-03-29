import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  title: String,
  ingredients: [String],
  instructions: [String],
  image_url: String,
  youtube_url: String,
  type: String,
  cooking_time: Number
});

export default mongoose.model("Recipe", recipeSchema);
