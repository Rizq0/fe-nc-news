import { useEffect, useState } from "react";
import { getArticleById, patchLike } from "../../api-calls/api-calls";
import Lottie from "lottie-react";
import cogLoading from "../../assets/loading.json";

export const Article = ({
  articleid,
  commentCount,
  setCommentCount,
  setIsIdError,
  setErrorMsg,
}) => {
  const [getArticle, setArticle] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [votesCount, setVotesCount] = useState(0);
  const [voteError, setVoteError] = useState(false);
  const [currentVote, setCurrentVote] = useState();

  const handleVote = (e) => {
    const value = e.target.value;
    if (value === "-1 Vote") {
      setCurrentVote("-1");
      setVotesCount((currVote) => {
        return currVote - 1;
      });
    } else {
      setCurrentVote("+1");
      setVotesCount((currVote) => {
        return currVote + 1;
      });
    }
    patchLike(articleid, value)
      .then((res) => {
        setVoteError(false);
      })
      .catch((err) => {
        console.log(err);
        setVoteError(true);
      });
  };

  useEffect(() => {
    getArticleById(articleid)
      .then(({ data: { article } }) => {
        setVotesCount(article.votes);
        setCommentCount(article.comment_count);
        setArticle(article);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsIdError(true);
        setErrorMsg(err);
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
          disabled={currentVote === "+1"}
        />
        <input
          onClick={handleVote}
          type="button"
          value="-1 Vote"
          className="one-minus-vote"
          disabled={currentVote === "-1"}
        />
        <p className="article-votes">Votes: {votesCount}</p>
        <p className="article-commentcount">Comment Count: {commentCount}</p>
      </div>
      {voteError ? (
        <p className="vote-error">
          Error Registering Vote, Refresh Page & Please Try Again
        </p>
      ) : null}
    </div>
  );
};
