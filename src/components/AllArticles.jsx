import { useState, useEffect } from "react";
import { getAllArticles } from "../api-calls/api-calls";
import { ArticleCard } from "./AllArticles-components/ArticleCard";
import Lottie from "lottie-react";
import cogLoading from "../assets/loading.json";
import cogError from "../assets/error.json";
import { Toolbar } from "./Toolbar";
import { useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

function AllArticles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortByAll] = useState("created_at");
  const [order, setOrderAll] = useState("DESC");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [topics, setTopics] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isApiError, setIsApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState();
  const [paramError, setParamError] = useState(false);

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
    setParamError(false);

    const allowedKeys = ["sort_by", "order"];
    const paramKeys = Array.from(searchParams.keys());
    const notAllowedKeys = paramKeys.filter((param) => {
      return !allowedKeys.includes(param);
    });

    if (notAllowedKeys.length > 0) {
      setIsLoading(false);
      setParamError(true);
      return;
    }
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
        setIsApiError(false);
        setArticles(data.articles);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsApiError(true);
        setApiErrorMessage(err);
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
  const topicValidation = topics.map((topic) => {
    return topic.slug;
  });
  topicValidation.push(undefined);
  const checkValidTopic = topicValidation.includes(topic);

  const hasError = !checkValidTopic || isApiError || paramError;
  return (
    <section className="page-content">
      {!hasError && (
        <Toolbar
          selectedTopic={selectedTopic}
          sortByAll={sortBy}
          orderAll={order}
          topics={topics}
          setTopics={setTopics}
        />
      )}
      <div className="articles-container">
        {hasError ? (
          <div className="indiv-container">
            <Lottie animationData={cogError} loop={true} className="error" />
            <h1 className="error-text">THERE HAS BEEN AN ERROR</h1>
            {!checkValidTopic && (
              <h2 className="sub-error-text">Topic Does Not Exist</h2>
            )}
            {isApiError && (
              <h2 className="sub-error-text">
                {apiErrorMessage.status} {apiErrorMessage.response.data.msg}
              </h2>
            )}
            {paramError && (
              <h2 className="sub-error-text">Parameter Key Incorrect</h2>
            )}
          </div>
        ) : selectedTopic === "all" ? (
          articles.map((article) => (
            <ArticleCard article={article} key={article.title} />
          ))
        ) : (
          articles.map((article) => {
            return topic === article.topic ? (
              <ArticleCard article={article} key={article.title} />
            ) : null;
          })
        )}
      </div>
    </section>
  );
}

export default AllArticles;
