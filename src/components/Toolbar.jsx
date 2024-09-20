import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import cogLoading from "../assets/loading.json";
import { useNavigate } from "react-router-dom";
import { getAllTopics } from "../api-calls/api-calls";
import { useSearchParams, createSearchParams } from "react-router-dom";

export const Toolbar = ({
  selectedTopic,
  sortByAll,
  orderAll,
  topics,
  setTopics,
}) => {
  const [topicsLoading, setTopicsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  const handleTopics = (e) => {
    const value = e.target.value;
    if (value === "all") {
      navigate({
        pathname: "/",
        search: searchParams.toString(),
      });
    } else {
      navigate({
        pathname: `/articles/topics/${value}`,
        search: searchParams.toString(),
      });
    }
  };

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort_by", sortByAll);
    newParams.set("order", orderAll);
    setSearchParams(newParams);
  }, []);

  const handleSortBy = (e) => {
    const value = e.target.value;
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort_by", value);
    setSearchParams(newParams);
  };

  const handleOrder = (e) => {
    const value = e.target.value;
    const newParams = new URLSearchParams(searchParams);
    newParams.set("order", value);
    setSearchParams(newParams);
  };

  useEffect(() => {
    getAllTopics()
      .then(({ data: { topics } }) => {
        setTopics(topics);
      })
      .catch((err) => {
        setTopicsLoading(false);
        console.log(err);
      })
      .finally(() => {
        setTopicsLoading(false);
      });
  }, []);

  return (
    <div className="toolbar-container">
      <div className="query-container">
        <div className="query-select-container">
          <p className="topic-label">Sort By</p>
          <select
            name="queries"
            onChange={handleSortBy}
            className="topic-select"
            value={sortByAll}
          >
            <option value="created_at">date</option>
            <option value="comment_count">comment count</option>
            <option value="votes">vote count</option>
          </select>
        </div>
        <div className="query-select-container">
          <p className="topic-label">Order</p>
          <select
            name="order"
            onChange={handleOrder}
            className="topic-select"
            value={orderAll}
          >
            <option value="DESC">descending</option>
            <option value="ASC">ascending</option>
          </select>
        </div>
      </div>
      {topicsLoading ? (
        <Lottie
          animationData={cogLoading}
          loop={true}
          className="toolbar-loading"
        />
      ) : (
        <div className="topic-select-container">
          <p className="topic-label">Topic Filter</p>
          <select
            name="topics"
            onChange={handleTopics}
            className="topic-select"
            value={selectedTopic}
          >
            <option value="all">all</option>
            {topics.map((topic) => {
              return (
                <option key={topic.slug} value={topic.slug}>
                  {topic.slug}
                </option>
              );
            })}
          </select>
        </div>
      )}
    </div>
  );
};
