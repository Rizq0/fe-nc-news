import axios from "axios";

const api = axios.create({
  baseURL: "https://joe-b-nc-news.onrender.com/api",
});

export const getAllArticles = (params) => {
  return api.get("/articles", params);
};
