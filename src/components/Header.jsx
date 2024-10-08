import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import homeIcon from "../assets/home.png";

export const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const userName = user.username;
  return (
    <header>
      <Link to="/?sort_by=created_at&order=DESC">
        <img src={homeIcon} alt="home button" className="homeicon" />
      </Link>
      <div className="vertical-divider"></div>
      <h1 className="headertitle">NC-NEWS</h1>
      <div className="user-area">
        <p className="logged-in-as">Logged In As:</p>
        <h1 className="username">{userName}</h1>
      </div>
    </header>
  );
};
