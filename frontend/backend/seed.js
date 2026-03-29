// seed.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const RecipeSchema = new mongoose.Schema({
  title: String,
  ingredients: [String],
  instructions: [String],
  type: { type: String, enum: ["veg", "non-veg"] },
  youtube_url: String,
  difficulty: String,
  time: Number,
  image_url: String,
});

const Recipe = mongoose.model("Recipe", RecipeSchema);

mongoose.connect(process.env.MONGO_URI).then(async () => {
  console.log("Connected to MongoDB");

  await Recipe.deleteMany({}); // Clear existing recipes

  await Recipe.insertMany([
    {
      title: "Butter Chicken",
      ingredients: ["Chicken", "Butter", "Tomato", "Cream", "Spices"],
      instructions: ["Marinate chicken", "Cook gravy", "Mix & simmer"],
      type: "non-veg",
      youtube_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      difficulty: "medium",
      time: 45,
      image_url:
        "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
    },
    {
      title: "Rajma Chawal",
      ingredients: ["Rajma", "Rice", "Onion", "Tomato", "Spices"],
      instructions: ["Cook rajma", "Boil rice", "Serve together"],
      type: "veg",
      youtube_url: "",
      difficulty: "easy",
      time: 30,
      image_url:
        "https://images.pexels.com/photos/5938/food-salad-healthy-lunch.jpg",
    },
  ]);

  console.log("Sample recipes added");
  mongoose.connection.close();
});
