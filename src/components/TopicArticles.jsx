import { Toolbar } from "./Toolbar";
import { ArticleCard } from "./AllArticles-components/ArticleCard";
import { useState, useEffect } from "react";
import { getAllArticles } from "../api-calls/api-calls";
import Lottie from "lottie-react";
import cogLoading from "../assets/loading.json";
import { useParams } from "react-router-dom";

export const TopicArticles = () => {
  const [articles, setArticles] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { topic } = useParams();

  useEffect(() => {
    const params = {
      //   sort_by: topic,
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
      <Toolbar />
      <div className="articles-container">
        {articles.map((article) => {
          return topic === article.topic ? (
            <ArticleCard article={article} key={article.title} />
          ) : null;
        })}
      </div>
    </section>
  );
};
