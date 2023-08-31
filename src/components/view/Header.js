import classNames from "classnames";
import { useState } from "react";
import LoginModal from "../layout/LoginModal";
import SignupModal from "../layout/SignupModal";
import AuthorImage from "../../assets/images/author.jpg";

export default function Header() {
  const [active, setActive] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const toggleActive = () => {
    setActive(!active);
  };

  const toggleLogin = () => {
    setShowLogin(!showLogin);
  };

  const toggleSignup = () => {
    setShowSignup(!showSignup);
  };

  return (
    <>
      <header className="header section">
        <div className="container">
          <a href="/" className="title">
            Jason's Blog
          </a>

          <nav className={classNames("navbar", { active: active })}>
            <ul className="navbar-list">
              <li className="navbar-item">
                <a href="/" className="navbar-link hover:underline">
                  Home
                </a>
              </li>

              <li className="navbar-item">
                <a
                  href="/postGallery/1"
                  className="navbar-link hover:underline"
                >
                  Tech Post
                </a>
              </li>

              <li className="navbar-item">
                <a
                  href="/postGallery/2"
                  className="navbar-link hover:underline"
                >
                  Life Post
                </a>
              </li>

              <li className="navbar-item">
                <a href="/info" className="navbar-link hover:underline">
                  Info
                </a>
              </li>

              <li className="navbar-item">
                <a
                  href="https://main.d29115wyne7x0v.amplifyapp.com/"
                  className="navbar-link hover:underline"
                >
                  Portfolio
                </a>
              </li>
              {!isLogin && (
                <>
                  <hr />
                  <li className="navbar-item login-btn">
                    <button
                      className="navbar-link-button"
                      onClick={toggleLogin}
                    >
                      login
                    </button>
                  </li>
                  <li className="navbar-item login-btn">
                    <button
                      className="navbar-link-button"
                      onClick={toggleSignup}
                    >
                      signup
                    </button>
                  </li>
                </>
              )}
            </ul>
          </nav>

          <div className="wrapper">
            {!isLogin && (
              <button className="search-btn" onClick={toggleSignup}>
                signup
              </button>
            )}

            <button
              className={classNames("nav-toggle-btn", { active: active })}
              onClick={toggleActive}
            >
              <span className="span one"></span>
              <span className="span two"></span>
              <span className="span three"></span>
            </button>

            {!isLogin && (
              <button to="#" className="btn" onClick={toggleLogin}>
                login
              </button>
            )}

            {isLogin && (
              <div className="profile-container">
                <img src={AuthorImage} alt="avatar" />
              </div>
            )}
          </div>
        </div>
      </header>
      <LoginModal show={showLogin} onHide={toggleLogin} />
      <SignupModal show={showSignup} onHide={toggleSignup} />
    </>
  );
}
