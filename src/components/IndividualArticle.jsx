import { Article } from "./IndividualArticle-components/Article";
import { useParams } from "react-router-dom";

export const IndividualArticle = () => {
  const { articleid } = useParams();
  return (
    <div className="indiv-container">
      <Article articleid={articleid} />
    </div>
  );
};
