import axios from "axios";

const api = axios.create({
  baseURL: "https://joe-b-nc-news.onrender.com/api",
});

export const getAllArticles = (params) => {
  return api.get("/articles", params);
};

export const getArticleById = (id) => {
  return api.get(`/articles/${id}`);
};
