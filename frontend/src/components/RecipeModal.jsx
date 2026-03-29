import React, { useState } from "react";
import CookingMode from "../components/CookingMode";

export default function RecipeModal({ recipe, onClose }) {
  const [cooking, setCooking] = useState(false);

  if (!recipe) return null;

  // YouTube embed
  const videoId = recipe.youtube_url?.split("v=")[1];
  const embedUrl = videoId
    ? `https://www.youtube.com/embed/${videoId}`
    : null;

  return (
    <>
      {/* 🍳 FULL SCREEN COOKING MODE */}
      {cooking && (
        <CookingMode
          recipe={recipe}
          onExit={() => setCooking(false)}
        />
      )}

      {/* 🔲 MODAL BACKDROP */}
      {!cooking && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-40">
          <div className="bg-white text-black rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative">

            {/* ❌ Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-xl font-bold hover:text-red-500"
            >
              ✕
            </button>

            {/* 🏷 Title */}
            <h2 className="text-2xl font-bold mb-4">
              {recipe.title}
            </h2>

            {/* 🖼 Image */}
            {recipe.image_url && (
              <img
                src={recipe.image_url}
                alt={recipe.title}
                className="w-full h-64 object-cover rounded mb-4"
              />
            )}

            {/* ℹ Meta Info */}
            <p className="text-sm text-gray-600 mb-4">
              {recipe.type} • {recipe.cooking_time} mins • {recipe.difficulty}
            </p>

            {/* 🍳 Start Cooking Button */}
            <button
              onClick={() => setCooking(true)}
              className="w-full mb-6 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              🍳 Start Cooking Mode
            </button>

            {/* 🧂 Ingredients */}
            <h3 className="text-lg font-semibold mb-2">
              Ingredients
            </h3>
            <ul className="list-disc pl-6 mb-4">
              {Array.isArray(recipe.ingredients)
                ? recipe.ingredients.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))
                : recipe.ingredients
                    .split(",")
                    .map((item, index) => (
                      <li key={index}>{item.trim()}</li>
                    ))}
            </ul>

            {/* 📋 Instructions */}
            <h3 className="text-lg font-semibold mb-2">
              Preparation
            </h3>
            <ol className="list-decimal pl-6 mb-4">
              {Array.isArray(recipe.instructions)
                ? recipe.instructions.map((step, index) => (
                    <li key={index} className="mb-2">
                      {step}
                    </li>
                  ))
                : recipe.instructions
                    .split(".")
                    .map(
                      (step, index) =>
                        step.trim() && (
                          <li key={index} className="mb-2">
                            {step.trim()}
                          </li>
                        )
                    )}
            </ol>

            {/* ▶ YouTube Video */}
            {embedUrl && (
              <iframe
                className="w-full h-64 rounded"
                src={embedUrl}
                title={recipe.title}
                allowFullScreen
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
