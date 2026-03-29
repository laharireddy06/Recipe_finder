import { useState } from "react";
import axios from "axios";

export default function Admin() {
  const [data, setData] = useState({
    title: "",
    image_url: "",
    youtube_url: "",
    ingredients: "",
    instructions: ""
  });

  const submit = async () => {
    await axios.post("http://localhost:5000/api/recipes", {
      ...data,
      ingredients: data.ingredients.split(","),
      instructions: data.instructions.split(".")
    });
    alert("Recipe Added ✅");
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl mb-4">Admin Panel</h2>

      {Object.keys(data).map(key => (
        <input
          key={key}
          placeholder={key}
          className="block w-full mb-3 p-2 bg-black"
          onChange={e => setData({ ...data, [key]: e.target.value })}
        />
      ))}

      <button onClick={submit} className="bg-green-600 px-4 py-2">
        Add Recipe
      </button>
    </div>
  );
}
