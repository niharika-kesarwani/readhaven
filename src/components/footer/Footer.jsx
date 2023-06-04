import "./Footer.css";
import { NavLink } from "react-router-dom";
import LanguageIcon from "@mui/icons-material/Language";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useAuth } from "../../index";

export const Footer = () => {
  const { currentUser } = useAuth();

  return (
    <div className="footer">
      <div className="footer_wrapper">
        <div className="footer_app_info">
          <h1>READHAVEN</h1>
          <p>Because life is better with books...</p>
          <p>© 2023 READHAVEN</p>
        </div>
        <div className="footer_connect">
          <h2>CONNECT WITH ME</h2>
          <div className="footer_connect_links">
            <NavLink
              className="navlink"
              to="https://niharikakesarwani.netlify.app/"
              target="_blank"
            >
              <LanguageIcon />
            </NavLink>
            <NavLink
              className="navlink"
              to="https://twitter.com/Niharika_twt"
              target="_blank"
            >
              <TwitterIcon />
            </NavLink>
            <NavLink
              className="navlink"
              to="https://github.com/niharika-kesarwani"
              target="_blank"
            >
              <GitHubIcon />
            </NavLink>
            <NavLink
              className="navlink"
              to="https://www.linkedin.com/in/niharika-kesarwani"
              target="_blank"
            >
              <LinkedInIcon />
            </NavLink>
          </div>
        </div>
        <div className="footer_links">
          <h2>QUICK LINKS</h2>
          <div className="footer_links_list">
            {!currentUser && (
              <p>
                <NavLink
                  className="navlink"
                  to={currentUser ? "/profile" : "/login"}
                >
                  Sign Up/Login
                </NavLink>
              </p>
            )}
            <p>
              <NavLink className="navlink" to="/">
                Home
              </NavLink>
            </p>
            <p>
              <NavLink className="navlink" to="/books">
                Books
              </NavLink>
            </p>
            <p>
              <NavLink className="navlink" to="/cart">
                Cart
              </NavLink>
            </p>
            <p>
              <NavLink className="navlink" to="/wishlist">
                Wishlist
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
