import { useState, useEffect } from "react";
import { getAllArticles } from "../api-calls/api-calls";
import { ArticleCard } from "./AllArticles-components/ArticleCard";
import Lottie from "lottie-react";
import cogLoading from "../assets/loading.json";
import { Toolbar } from "./Toolbar";
import { useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

function AllArticles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortByAll] = useState("created_at");
  const [order, setOrderAll] = useState("DESC");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const { topic } = useParams();
  useEffect(() => {
    if (!topic) {
      setSelectedTopic("all");
    } else {
      setSelectedTopic(topic);
    }
  }, [topic]);

  useEffect(() => {
    setIsLoading(true);
    const sortByQuery = searchParams.get("sort_by");
    if (sortByQuery) {
      setSortByAll(sortByQuery);
    }
    const orderQuery = searchParams.get("order");
    if (orderQuery) {
      setOrderAll(orderQuery);
    }
    const params = {
      sort_by: sortByQuery ?? sortBy,
      order: orderQuery ?? order,
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
  }, [searchParams, topic]);

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
        sortByAll={sortBy}
        orderAll={order}
      />
      <div className="articles-container">
        {selectedTopic === "all"
          ? articles.map((article) => (
              <ArticleCard article={article} key={article.title} />
            ))
          : articles.map((article) => {
              return topic === article.topic ? (
                <ArticleCard article={article} key={article.title} />
              ) : null;
            })}
      </div>
    </section>
  );
}

export default AllArticles;
