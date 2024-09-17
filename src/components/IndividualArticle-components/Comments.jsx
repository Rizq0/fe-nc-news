import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import cogLoading from "../../assets/loading.json";
import { getCommentsById } from "../../api-calls/api-calls";

export const Comments = ({ articleid }) => {
  const [commentsById, setCommentsById] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCommentsById(articleid)
      .then(({ data: { comments } }) => {
        setIsLoading(false);
        setCommentsById(comments);
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
    <div className="comments-container">
      <h1>Comments</h1>
      {commentsById.map((comment) => {
        return (
          <div key={comment.comment_id} className="comment-item">
            <p>{comment.body}</p>
            <p>Authored By: {comment.author}</p>
            <p>Votes: {comment.votes}</p>
          </div>
        );
      })}
    </div>
  );
};
