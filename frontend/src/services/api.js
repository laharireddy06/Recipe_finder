import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

export const getRecipes = async () => {
  const res = await API.get("/recipes");
  return res.data;
};
