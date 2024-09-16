import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const userName = user.username;
  return (
    <header>
      <Link to="/">
        <img src="src/assets/home.png" alt="home button" className="homeicon" />
      </Link>
      <h1>NC-NEWS</h1>
      <h1>{userName}</h1>
    </header>
  );
};
