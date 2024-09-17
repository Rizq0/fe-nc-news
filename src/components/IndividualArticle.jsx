import { Article } from "./IndividualArticle-components/Article";
import { Comments } from "./IndividualArticle-components/Comments";
import { useState } from "react";
import { useParams } from "react-router-dom";

export const IndividualArticle = () => {
  const { articleid } = useParams();
  const [commentCount, setCommentCount] = useState();
  return (
    <div className="indiv-container">
      <Article
        articleid={articleid}
        commentCount={commentCount}
        setCommentCount={setCommentCount}
      />
      <Comments
        articleid={articleid}
        commentCount={commentCount}
        setCommentCount={setCommentCount}
      />
    </div>
  );
};
