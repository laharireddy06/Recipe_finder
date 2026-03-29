import React from "react";

export default function RecipeSlider({ recipes, onSelect }) {
  return (
    <div className="px-6 -mt-16 pb-6">
      {/* No heading now */}

      <div className="flex gap-5 overflow-x-auto scrollbar-hide">
        {recipes.map((r) => (
          <div
            key={r._id}
            onClick={() => onSelect(r)}
            className="min-w-[260px] cursor-pointer bg-gray-800 rounded-xl shadow-lg hover:scale-[1.02] transition"
          >
            <img
              src={r.image_url}
              alt={r.title}
              className="h-40 w-full object-cover rounded-t-xl"
            />

            <div className="p-4">
              <h3 className="font-semibold text-base">{r.title}</h3>
              <p className="text-sm opacity-70 flex items-center gap-1">
                ⏱ {r.cooking_time} mins
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
