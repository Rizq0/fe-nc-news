import { Link } from "react-router-dom";

export const ArticleCard = ({ article }) => {
  return (
    <Link to={`/articles/${article.article_id}`} className="article-link">
      <article className="article-item">
        <p className="article-title">{article.title}</p>
        <hr />
        <div className="authored-by">
          <p>Authored By:</p>
          <p>{article.author}</p>
        </div>

        <div className="authored-by">
          <p>Topic:</p>
          <p>{article.topic}</p>
        </div>
      </article>
    </Link>
  );
};
