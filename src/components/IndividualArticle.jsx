import { Article } from "./IndividualArticle-components/Article";
import { Comments } from "./IndividualArticle-components/Comments";
import { useParams } from "react-router-dom";

export const IndividualArticle = () => {
  const { articleid } = useParams();
  return (
    <div className="indiv-container">
      <Article articleid={articleid} />
      <Comments articleid={articleid} />
    </div>
  );
};
