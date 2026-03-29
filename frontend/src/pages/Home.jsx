import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import RecipeModal from "../components/RecipeModal";
import ChatBot from "../components/ChatBot";

export default function Home({ user }) {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [ratings, setRatings] = useState({});
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Refs for sliders
  const trendingRef = useRef(null);
  const favoritesRef = useRef(null);

  // Fetch recipes
  useEffect(() => {
    axios.get("http://localhost:5000/api/recipes").then((res) => {
      setRecipes(res.data);
      setFilteredRecipes(res.data);
      setLoading(false);
    });
  }, []);

  // Load favorites and ratings from localStorage
  useEffect(() => {
    const savedFavs = JSON.parse(localStorage.getItem("favorites")) || [];
    const savedRatings = JSON.parse(localStorage.getItem("ratings")) || {};
    setFavorites(savedFavs);
    setRatings(savedRatings);
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Save ratings to localStorage
  useEffect(() => {
    localStorage.setItem("ratings", JSON.stringify(ratings));
  }, [ratings]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const rateRecipe = (id, value) => {
    setRatings((prev) => ({ ...prev, [id]: value }));
  };

  // Filter recipes
  useEffect(() => {
    let temp = [...recipes];
    if (typeFilter !== "all") temp = temp.filter((r) => r.type === typeFilter);
    if (timeFilter === "<15") temp = temp.filter((r) => Number(r.cooking_time) <= 15);
    if (timeFilter === "<30") temp = temp.filter((r) => Number(r.cooking_time) <= 30);
    if (searchQuery.trim())
      temp = temp.filter((r) =>
        r.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    setFilteredRecipes(temp);
  }, [recipes, typeFilter, timeFilter, searchQuery]);

  // Top 5 trending recipes (highest rated or first 5)
  const trendingRecipes = recipes
    .filter((r) => ratings[r._id])
    .sort((a, b) => (ratings[b._id] || 0) - (ratings[a._id] || 0))
    .slice(0, 5);

  const favoriteRecipes = recipes.filter((r) => favorites.includes(r._id));

  // Scroll functions
  const scrollLeft = (ref) => {
    ref.current.scrollBy({ left: -250, behavior: "smooth" });
  };
  const scrollRight = (ref) => {
    ref.current.scrollBy({ left: 250, behavior: "smooth" });
  };

  // Auto-scroll every 3 seconds
  useEffect(() => {
    const intervalTrending = setInterval(() => {
      if (trendingRef.current) scrollRight(trendingRef);
    }, 3000);

    const intervalFavorites = setInterval(() => {
      if (favoritesRef.current) scrollRight(favoritesRef);
    }, 4000); // Slightly different speed for variety

    return () => {
      clearInterval(intervalTrending);
      clearInterval(intervalFavorites);
    };
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen text-white transition-colors duration-300">

      {/* HERO SECTION */}
      <div className="relative px-6 py-16 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-green-400 mb-2 font-semibold">📍 Discover Recipes</p>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
              Discover food <br /> made just for you
            </h1>
            <p className="text-gray-300 mb-6">
              Welcome <span className="font-semibold">{user?.username || "Guest"}</span> 🍽️  
              Find delicious meals in minutes.
            </p>

            <div className="flex bg-white rounded-full overflow-hidden max-w-md shadow-lg">
              <input
                type="text"
                placeholder="Search recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-5 py-3 text-black outline-none focus:ring-2 focus:ring-green-500 rounded-l-full transition"
              />
              <button className="bg-green-500 px-6 text-white font-semibold hover:bg-green-600 transition-colors rounded-r-full">
                Search
              </button>
            </div>
          </div>

          <img
            src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"
            className="hidden md:block w-full max-w-md rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
            alt="Hero"
          />
        </div>
      </div>

      {/* TRENDING RECIPES */}
      {trendingRecipes.length > 0 && (
        <div className="px-6 mt-10 max-w-6xl mx-auto relative">
          <h2 className="text-2xl font-bold mb-4">🔥 Trending Recipes</h2>

          {/* Left Arrow */}
          <button
            onClick={() => scrollLeft(trendingRef)}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-green-500 transition z-10"
          >
            ◀
          </button>

          {/* Slider */}
          <div
            ref={trendingRef}
            className="flex space-x-4 overflow-x-auto pb-4 scroll-smooth scrollbar-hide"
          >
            {trendingRecipes.map((r) => (
              <div
                key={r._id}
                className="min-w-[200px] bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 flex-shrink-0"
              >
                <img
                  src={r.image_url}
                  alt={r.title}
                  className="h-36 w-full object-cover cursor-pointer"
                  onClick={() => setSelectedRecipe(r)}
                />
                <div className="p-3">
                  <h3
                    className="font-semibold cursor-pointer hover:text-green-400"
                    onClick={() => setSelectedRecipe(r)}
                  >
                    {r.title}
                  </h3>
                  <p className="text-sm text-gray-400">{r.type}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scrollRight(trendingRef)}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-green-500 transition z-10"
          >
            ▶
          </button>
        </div>
      )}

      {/* FAVORITES CAROUSEL */}
      {favoriteRecipes.length > 0 && (
        <div className="px-6 mt-10 max-w-6xl mx-auto relative">
          <h2 className="text-2xl font-bold mb-4">❤️ Your Favorites</h2>

          {/* Left Arrow */}
          <button
            onClick={() => scrollLeft(favoritesRef)}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-green-500 transition z-10"
          >
            ◀
          </button>

          <div
            ref={favoritesRef}
            className="flex space-x-4 overflow-x-auto pb-4 scroll-smooth scrollbar-hide"
          >
            {favoriteRecipes.map((r) => (
              <div
                key={r._id}
                className="min-w-[200px] bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 flex-shrink-0"
              >
                <img
                  src={r.image_url}
                  alt={r.title}
                  className="h-36 w-full object-cover cursor-pointer"
                  onClick={() => setSelectedRecipe(r)}
                />
                <div className="p-3">
                  <h3
                    className="font-semibold cursor-pointer hover:text-green-400"
                    onClick={() => setSelectedRecipe(r)}
                  >
                    {r.title}
                  </h3>
                  <p className="text-sm text-gray-400">{r.type}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scrollRight(favoritesRef)}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-green-500 transition z-10"
          >
            ▶
          </button>
        </div>
      )}

      {/* FILTERS */}
      <div className="px-6 mt-8 max-w-6xl mx-auto flex flex-wrap items-center gap-4">
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="p-2 rounded text-black hover:ring-1 hover:ring-green-500 transition"
        >
          <option value="all">All Types</option>
          <option value="veg">Veg</option>
          <option value="non-veg">Non-Veg</option>
        </select>

        <select
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
          className="p-2 rounded text-black hover:ring-1 hover:ring-green-500 transition"
        >
          <option value="all">All Times</option>
          <option value="<15">Under 15 mins</option>
          <option value="<30">Under 30 mins</option>
        </select>

        <p className="ml-auto text-gray-400 font-medium">
          {filteredRecipes.length} recipe{filteredRecipes.length !== 1 && "s"} found
        </p>
      </div>

      {/* RECIPES GRID */}
      <div className="px-6 mt-6 max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-8 pb-16">
        {loading
          ? Array(6)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-800 h-72 rounded-2xl animate-pulse"
                />
              ))
          : filteredRecipes.map((r) => (
              <div
                key={r._id}
                className="bg-gray-800 rounded-2xl overflow-hidden relative hover:scale-105 transition-transform duration-300 shadow-lg"
              >
                {/* Favorite */}
                <button
                  onClick={() => toggleFavorite(r._id)}
                  className={`absolute top-3 right-3 text-xl transition-colors duration-200 ${
                    favorites.includes(r._id) ? "text-red-500" : "text-gray-400 hover:text-red-500"
                  }`}
                >
                  ❤️
                </button>

                {/* Recipe Image */}
                <img
                  src={r.image_url}
                  className="h-48 w-full object-cover cursor-pointer transform hover:scale-105 transition-transform duration-300"
                  onClick={() => setSelectedRecipe(r)}
                  alt={r.title}
                />

                {/* Recipe Info */}
                <div className="p-4">
                  <h2
                    className="font-bold text-lg cursor-pointer hover:text-green-400 transition-colors duration-300"
                    onClick={() => setSelectedRecipe(r)}
                  >
                    {r.title}
                  </h2>

                  <p className="text-sm text-gray-400 mt-1">
                    {r.type} • {r.cooking_time} mins
                  </p>

                  {/* Ratings */}
                  <div className="flex gap-1 mt-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <span
                        key={i}
                        onClick={() => rateRecipe(r._id, i)}
                        className={`cursor-pointer transition-colors duration-200 ${
                          i <= (ratings[r._id] || 0)
                            ? "text-yellow-400 hover:text-yellow-500"
                            : "text-gray-600 hover:text-yellow-400"
                        }`}
                      >
                        ⭐
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
      </div>

      {/* CONTACT */}
      <div className="bg-gray-800 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">📞 Contact Us</h2>
          <p className="text-gray-300 mb-6">
            Have questions or feedback? We'd love to hear from you.
          </p>

          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="bg-gray-900 p-6 rounded-xl hover:bg-gray-700 transition-colors duration-300">
              <h3 className="font-bold mb-2">📧 Email</h3>
              <p className="text-gray-400">support@recipeapp.com</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-xl hover:bg-gray-700 transition-colors duration-300">
              <h3 className="font-bold mb-2">📍 Location</h3>
              <p className="text-gray-400">Hyderabad, India</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-xl hover:bg-gray-700 transition-colors duration-300">
              <h3 className="font-bold mb-2">📱 Phone</h3>
              <p className="text-gray-400">+91 90000 04000</p>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-black py-6 text-center text-gray-500">
        © {new Date().getFullYear()} Recipe App. All rights reserved.
      </footer>

      {/* MODAL */}
      {selectedRecipe && (
        <RecipeModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
      )}

      {/* CHATBOT */}
      {!loading && recipes.length > 0 && (
        <ChatBot recipes={recipes} onSelectRecipe={setSelectedRecipe} />
      )}
    </div>
  );
}
