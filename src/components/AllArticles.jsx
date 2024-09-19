import { useState, useEffect } from "react";
import { getAllArticles } from "../api-calls/api-calls";
import { ArticleCard } from "./AllArticles-components/ArticleCard";
import Lottie from "lottie-react";
import cogLoading from "../assets/loading.json";
import { Toolbar } from "./Toolbar";
import { useSearchParams } from "react-router-dom";

function AllArticles({ selectedTopic, setSelectedTopic }) {
  const [articles, setArticles] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortByAll] = useState("created_at");
  const [order, setOrderAll] = useState("DESC");

  useEffect(() => {
    setIsLoading(true);
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
        setSortByAll={setSortByAll}
        setOrderAll={setOrderAll}
        sortByAll={sortBy}
        orderAll={order}
      />
      <div className="articles-container">
        {articles.map((article) => (
          <ArticleCard article={article} key={article.title} />
        ))}
      </div>
    </section>
  );
}

export default AllArticles;
