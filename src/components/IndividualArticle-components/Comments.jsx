import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import cogLoading from "../../assets/loading.json";
import { getCommentsById, postComment } from "../../api-calls/api-calls";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

export const Comments = ({ articleid, commentCount, setCommentCount }) => {
  const [commentsById, setCommentsById] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [commentError, setCommentError] = useState(false);
  const [commentSuccess, setCommentSuccess] = useState(false);
  const [commentBody, setPostComment] = useState("");
  const { user, setUser } = useContext(UserContext);

  const handleComment = (e) => {
    const value = e.target.value;
    setPostComment(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postComment(articleid, user.username, commentBody)
      .then(({ data: { comment } }) => {
        setCommentSuccess(true);
        setCommentCount((currCount) => Number(currCount) + 1);
        commentsById.push(comment);
      })
      .catch((err) => {
        setCommentError(true);
      });
  };

  useEffect(() => {
    getCommentsById(articleid)
      .then(({ data: { comments } }) => {
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
      <div className="post-comment-container">
        <h2 className="post-comment">Post Comment</h2>
        <form className="post-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Please type your comment here..."
            className="comment-input"
            onChange={handleComment}
            required
          />
          <input
            type="submit"
            value="Submit Comment"
            className="comment-submit"
          />
        </form>
        {commentError ? (
          <p className="comment-error-success">
            There has been an error posting your comment.
          </p>
        ) : null}
        {commentSuccess ? (
          <p className="comment-error-success">
            Your comment has successfully been posted.
          </p>
        ) : null}
      </div>
      {commentsById.length === 0 ? (
        <h2 className="no-comments">No Comments Available</h2>
      ) : null}
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
