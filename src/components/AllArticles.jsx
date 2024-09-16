import { useState, useEffect } from "react";
import { getAllArticles } from "../api-calls/api-calls";
import { ArticleCard } from "./AllArticles-components/ArticleCard";

function AllArticles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const params = {
      //   sort_by: "title",
      //   order: "ASC",
    };
    getAllArticles({ params })
      .then(({ data }) => {
        setArticles(data.articles);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section className="page-content">
      <div className="articles-container">
        {articles?.map((article) => (
          <ArticleCard article={article} key={article.title} />
        ))}
      </div>
    </section>
  );
}

export default AllArticles;
