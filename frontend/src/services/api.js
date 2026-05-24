import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getRecipes = async () => {
  const res = await API.get("/api/recipes");
  return res.data;
};