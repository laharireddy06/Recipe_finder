import React, { useEffect, useState } from "react";
import axios from "axios";

import HeroBanner from "../components/HeroBanner";
import RecipeCard from "../components/RecipeCard";
import RecipeModal from "../components/RecipeModal";
import ChatBot from "../components/ChatBot";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [searchText, setSearchText] = useState("");

  /* ---------------- FETCH RECIPES ---------------- */
  useEffect(() => {
    axios.get("http://localhost:5000/api/recipes").then((res) => {
      setRecipes(res.data);
    });

    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(favs);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const scrollToRecipes = () => {
    const element = document.getElementById("recipes-section");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const toggleFavoritesView = () => {
    setShowFavorites(!showFavorites);
  };

  /* ---------------- FILTER RECIPES ---------------- */
  const filteredRecipes = recipes
    .filter((recipe) => !showFavorites || favorites.includes(recipe._id))
    .filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(searchText.toLowerCase()) ||
        (Array.isArray(recipe.ingredients) &&
          recipe.ingredients.join(" ").toLowerCase().includes(searchText.toLowerCase()))
    );

  return (
    <div className="bg-[#0f172a] text-white min-h-screen">
      {/* HERO BANNER */}
      <HeroBanner />

      {/* EXPLORE / FAVORITES BUTTONS */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={scrollToRecipes}
          className="bg-red-500 px-6 py-2 rounded-md font-semibold hover:bg-red-600 transition"
        >
          Explore Recipes
        </button>
        <button
          onClick={toggleFavoritesView}
          className="border border-white px-6 py-2 rounded-md font-semibold hover:bg-white hover:text-black transition"
        >
          {showFavorites ? "View All" : "View Favorites"}
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="flex justify-center mt-4 px-6">
        <input
          type="text"
          placeholder="Search recipes..."
          className="w-full max-w-md bg-gray-800 p-2 rounded text-white"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {/* RECIPE GRID */}
      <section id="recipes-section" className="px-6 mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe._id}
              recipe={recipe}
              onClick={() => setSelectedRecipe(recipe)}
              onFav={() => toggleFavorite(recipe._id)}
              isFav={favorites.includes(recipe._id)}
              searchText={searchText}
            />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-300">
            No recipes found.
          </p>
        )}
      </section>

      {/* MODAL */}
      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}

      {/* FLOATING CHATBOT */}
      <ChatBotFloating recipes={recipes} onSelectRecipe={setSelectedRecipe} />
    </div>
  );
}

/* ---------------- FLOATING CHATBOT ---------------- */
function ChatBotFloating({ recipes, onSelectRecipe }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="mb-4 w-80 bg-gray-900 p-4 rounded-xl shadow-xl">
          <div className="flex justify-between mb-2">
            <span className="font-bold">ChatBot 🤖</span>
            <button onClick={() => setOpen(false)}>✖</button>
          </div>
          <ChatBot recipes={recipes} onSelectRecipe={onSelectRecipe} />
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="bg-green-500 p-4 rounded-full shadow-lg"
      >
        💬
      </button>
    </div>
  );
}
