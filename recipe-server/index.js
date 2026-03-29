const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Replace <password> with your actual MongoDB password
const mongoURI = "mongodb+srv://recipeUser:Lahari26@recipecluster.sphxlfb.mongodb.net/recipeDB?appName=recipeCluster"; 

mongoose.connect(mongoURI)
  .then(() => console.log("✅ Bridge is Open: Connected to MongoDB!"))
  .catch(err => console.log("❌ Bridge Error:", err));

const recipeSchema = new mongoose.Schema({
  title: String,
  ingredients: String,
  instructions: Array,
  image_url: String,
  youtube_url: String,
  type: String,
  cooking_time: Number,
  difficulty: String
});

const Recipe = mongoose.model('Recipe', recipeSchema, 'recipes');

app.get('/api/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));