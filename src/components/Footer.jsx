import gitHubIcon from "../assets/github-mark.png";
import linkd from "../assets/LI-In-Bug.png";
import gitHubIconTwo from "../assets/GitHub_Logo.png";

function Footer() {
  return (
    <>
      <footer>
        <div className="footer-text">
          <h1 className="footer-designedby">Created By Joe Brown</h1>
          <p className="footer-addtext">
            Built with HTML, CSS and JavaScript using React.
          </p>
        </div>
        <div className="footer-icons">
          <div className="footer-single-icon">
            <a href="https://github.com/Rizq0" className="anchor-flex">
              <img src={gitHubIcon} alt="github link" className="icons" />
            </a>
            <p className="icon-text">GitHub</p>
          </div>
          <div className="footer-single-icon">
            <a
              href="https://www.linkedin.com/in/joe-brown0/"
              className="anchor-flex"
            >
              <img src={linkd} alt="linkedin link" className="icons" />
            </a>
            <p className="icon-text">LinkedIn</p>
          </div>
          <div className="footer-single-icon">
            <a
              href="https://github.com/Rizq0/fe-nc-news"
              className="anchor-flex"
            >
              <img
                src={gitHubIconTwo}
                alt="github repo link"
                className="icons"
              />
            </a>
            <p className="icon-text">Frontend Repository</p>
          </div>
          <div className="footer-single-icon">
            <a
              href="https://github.com/Rizq0/be-nc-news"
              className="anchor-flex"
            >
              <img
                src={gitHubIconTwo}
                alt="github repo link"
                className="icons"
              />
            </a>
            <p className="icon-text">API Repository</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
