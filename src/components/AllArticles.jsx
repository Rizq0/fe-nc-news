import { useState, useEffect } from "react";
import { getAllArticles } from "../api-calls/api-calls";
import { ArticleCard } from "./AllArticles-components/ArticleCard";

function AllArticles() {
  const [articles, setArticles] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const params = {
      //   sort_by: "title",
      //   order: "ASC",
    };
    getAllArticles({ params })
      .then(({ data }) => {
        setIsLoading(false);
        setArticles(data.articles);
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
    <section className="page-content">
      <div className="articles-container">
        {articles.map((article) => (
          <ArticleCard article={article} key={article.title} />
        ))}
      </div>
    </section>
  );
}

export default AllArticles;
