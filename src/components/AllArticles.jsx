import { useState, useEffect } from "react";
import { getAllArticles } from "../api-calls/api-calls";
import { ArticleCard } from "./AllArticles-components/ArticleCard";
import Lottie from "lottie-react";
import cogLoading from "../assets/loading.json";

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
    return (
      <div className="loadingdiv">
        <Lottie animationData={cogLoading} loop={true} className="loading" />
      </div>
    );
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
