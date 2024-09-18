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

export const getCommentsById = (id) => {
  return api.get(`/articles/${id}/comments`);
};

export const patchLike = (id, vote) => {
  let value = 1;
  if (vote === "-1 Vote") {
    value = -1;
  }
  let voteBody = { inc_votes: value };
  return api.patch(`/articles/${id}`, voteBody);
};

export const postComment = (id, user, value) => {
  let commentBody = {
    username: `${user}`,
    body: `${value}`,
  };
  return api.post(`/articles/${id}/comments`, commentBody);
};

export const deleteComment = (commentId) => {
  return api.delete(`/comments/${commentId}`);
};
