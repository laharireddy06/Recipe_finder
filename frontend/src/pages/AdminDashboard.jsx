import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/recipes"); // Adjust API endpoint
      setRecipes(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch recipes");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) return;

    try {
      await axios.delete(`/api/recipes/${id}`);
      setRecipes(recipes.filter((r) => r._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete recipe");
    }
  };

  if (loading) return <p className="p-4 text-white">Loading recipes...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      {recipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <div
              key={recipe._id}
              className="border border-gray-700 rounded p-4 shadow hover:shadow-lg transition bg-gray-800"
            >
              <img
                src={recipe.image || "https://via.placeholder.com/150"}
                alt={recipe.title}
                className="w-full h-40 object-cover rounded mb-2"
              />
              <h2 className="text-lg font-semibold">{recipe.title}</h2>
              <p className="text-sm text-gray-300 mb-2">{recipe.description}</p>
              <button
                onClick={() => handleDelete(recipe._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
