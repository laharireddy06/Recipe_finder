export default function TrendingTags({ onSelect }) {
  const tags = [
    "Chicken",
    "Veg",
    "Desserts",
    "Quick",
    "Healthy",
    "Spicy",
    "Kids",
  ];

  return (
    <div className="px-6 my-4">
      <h3 className="font-bold mb-2">🔥 Trending</h3>
      <div className="flex flex-wrap gap-3">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => onSelect(tag)}
            className="px-4 py-1 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
          >
            #{tag}
          </button>
        ))}
      </div>
    </div>
  );
}
