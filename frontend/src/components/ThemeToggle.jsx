import React from "react";

export default function ThemeToggle({ darkMode, setDarkMode }) {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="flex items-center gap-2 px-4 py-2 rounded-full
                 bg-gray-800 text-white hover:bg-gray-700
                 transition shadow"
    >
      {darkMode ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
