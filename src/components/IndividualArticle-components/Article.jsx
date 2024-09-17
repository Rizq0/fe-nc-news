import { useEffect, useState } from "react";
import { getArticleById, patchLike } from "../../api-calls/api-calls";
import Lottie from "lottie-react";
import cogLoading from "../../assets/loading.json";

export const Article = ({ articleid }) => {
  const [getArticle, setArticle] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [votesCount, setVotesCount] = useState(0);

  const handleVote = (e) => {
    const value = e.target.value;
    if (value === "-1 Vote") {
      setVotesCount((currVote) => {
        return currVote - 1;
      });
    } else {
      setVotesCount((currVote) => {
        return currVote + 1;
      });
    }
    patchLike(articleid, value)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getArticleById(articleid)
      .then(({ data: { article } }) => {
        setIsLoading(false);
        setVotesCount(article.votes);
        setArticle(article);
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
      <Lottie animationData={cogLoading} loop={true} className="loading" />
    );
  }
  return (
    <div className="article-container">
      <h1>{getArticle.title}</h1>
      <img src={getArticle.article_img_url} className="article-img" />
      <h2>By {getArticle.author}</h2>
      <p>{getArticle.body}</p>
      <div className="votecomment">
        <input
          onClick={handleVote}
          type="button"
          value="+1 Vote"
          className="one-plus-vote"
        />
        <input
          onClick={handleVote}
          type="button"
          value="-1 Vote"
          className="one-minus-vote"
        />
        <p className="article-votes">Votes {votesCount}</p>
        <p>Comment Count {getArticle.comment_count}</p>
      </div>
    </div>
  );
};
