import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import cogLoading from "../../assets/loading.json";
import { getCommentsById, postComment } from "../../api-calls/api-calls";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import bin from "../../assets/bin.png";

export const Comments = ({ articleid, commentCount, setCommentCount }) => {
  const [commentsById, setCommentsById] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [commentIsLoading, setCommentIsLoading] = useState(false);
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
    setCommentIsLoading(true);
    postComment(articleid, user.username, commentBody)
      .then(({ data: { comment } }) => {
        setCommentIsLoading(false);
        setCommentSuccess(true);
        setCommentCount((currCount) => Number(currCount) + 1);
        commentsById.push(comment);
      })
      .catch((err) => {
        setCommentIsLoading(false);
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
        <h3 className="post-comment">as {user.username}</h3>
        <form className="post-form" onSubmit={handleSubmit}>
          <textarea
            className="comment-input"
            onChange={handleComment}
            placeholder="Please type your comment here..."
            required
          ></textarea>
          <div className="submit-container">
            <input
              type="submit"
              value="Submit Comment"
              className="comment-submit"
            />
          </div>
        </form>
        {commentIsLoading && (
          <Lottie animationData={cogLoading} loop={true} className="loading" />
        )}
        {commentError && (
          <p className="comment-error-success">
            There has been an error posting your comment.
          </p>
        )}
        {commentSuccess && (
          <p className="comment-error-success">
            Your comment has successfully been posted.
          </p>
        )}
      </div>
      {commentsById.length === 0 ? (
        <h2 className="no-comments">No Comments Available</h2>
      ) : null}
      {commentsById.map((comment) => {
        return (
          <div key={comment.comment_id} className="comment-item">
            <p>{comment.body}</p>
            <p>Authored By: {comment.author}</p>
            <div className="votes-delete">
              <p>Votes: {comment.votes}</p>
              {user.username === comment.author && (
                <input
                  type="image"
                  src={bin}
                  className="delete-comment-icon"
                  alt="delete comment"
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
