import { useEffect, useState } from "react";
import { getArticleById } from "../../api-calls/api-calls";

export const Article = ({ articleid }) => {
  const [getArticle, setArticle] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArticleById(articleid)
      .then(({ data: { article } }) => {
        setIsLoading(false);
        setArticle(article);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <h1>This page is loading!</h1>;
  }
  return (
    <div className="article-container">
      <h1>{getArticle?.title}</h1>
      <img src={getArticle?.article_img_url} />
      <h2>By {getArticle?.author}</h2>
      <p>{getArticle?.body}</p>
      <div className="votecomment">
        <p>Votes {getArticle.votes}</p>
        <p>Comment Count {getArticle.comment_count}</p>
      </div>
    </div>
  );
};
