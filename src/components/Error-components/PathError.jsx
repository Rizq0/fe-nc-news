import Lottie from "lottie-react";
import cogError from "../../assets/error.json";

export const PathError = () => {
  return (
    <div className="indiv-container">
      <Lottie animationData={cogError} loop={true} className="error" />
      <h1 className="error-text">THERE HAS BEEN AN ERROR</h1>
      <h2 className="sub-error-text">Bad Path</h2>
    </div>
  );
};
