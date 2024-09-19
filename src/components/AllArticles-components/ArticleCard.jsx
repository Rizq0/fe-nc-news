import { Link } from "react-router-dom";

export const ArticleCard = ({ article }) => {
  const dateArticle = article.created_at;
  const dateObject = new Date(dateArticle);
  const fullDate = dateObject.toLocaleDateString();

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
        <div className="authored-by">
          <p>Votes: {article.votes}</p>
          <p>Comments: {article.comment_count}</p>
        </div>
        <div className="authored-by">
          <p>Created: {fullDate}</p>
        </div>
      </article>
    </Link>
  );
};
