import { Toolbar } from "./Toolbar";
import { ArticleCard } from "./AllArticles-components/ArticleCard";
import { useState, useEffect } from "react";
import { getAllArticles } from "../api-calls/api-calls";
import Lottie from "lottie-react";
import cogLoading from "../assets/loading.json";
import { useParams } from "react-router-dom";

export const TopicArticles = ({ selectedTopic, setSelectedTopic }) => {
  const [articles, setArticles] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortByTopic] = useState("created_at");
  const [order, setOrderTopic] = useState("DESC");

  const { topic } = useParams();

  useEffect(() => {
    const params = {
      sort_by: sortBy,
      order: order,
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
  }, [sortBy, order]);

  if (isLoading) {
    return (
      <div className="loadingdiv">
        <Lottie animationData={cogLoading} loop={true} className="loading" />
      </div>
    );
  }

  return (
    <section className="page-content">
      <Toolbar
        selectedTopic={selectedTopic}
        setSelectedTopic={setSelectedTopic}
        setSortByTopic={setSortByTopic}
        setOrderTopic={setOrderTopic}
      />
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
