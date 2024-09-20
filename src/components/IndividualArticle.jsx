import { Article } from "./IndividualArticle-components/Article";
import { Comments } from "./IndividualArticle-components/Comments";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Lottie from "lottie-react";
import cogError from "../assets/error.json";

export const IndividualArticle = () => {
  const { articleid } = useParams();
  const [commentCount, setCommentCount] = useState();
  const [isIdError, setIsIdError] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  return (
    <div>
      {isIdError ? (
        <div className="indiv-container">
          <Lottie animationData={cogError} loop={true} className="error" />
          <h1 className="error-text">THERE HAS BEEN AN ERROR</h1>
          <h2>{errorMsg.status}</h2>
        </div>
      ) : (
        <div className="indiv-container">
          <Article
            articleid={articleid}
            commentCount={commentCount}
            setCommentCount={setCommentCount}
            setIsIdError={setIsIdError}
            setErrorMsg={setErrorMsg}
          />
          <Comments
            articleid={articleid}
            commentCount={commentCount}
            setCommentCount={setCommentCount}
          />
        </div>
      )}
    </div>
  );
};
