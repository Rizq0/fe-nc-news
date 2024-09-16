import { Link } from "react-router-dom";

export const ArticleCard = ({ article }) => {
  console.log(article);
  return (
    <Link to={`/articles/${article.article_id}`} className="article-link">
      <article className="article-item">
        <h1>{article.title}</h1>
        <h2>{article.author}</h2>
        <h3>{article.topic}</h3>
      </article>
    </Link>
  );
};
