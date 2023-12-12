import classNames from "classnames";
import { useState, useContext } from "react";

import { AuthContext } from "../../shared/context/auth-context";

import LoginModal from "../layout/LoginModal";
import SignupModal from "../layout/SignupModal";
import MessageModal from "../shared/MessageModal";

export default function Header() {
  const [active, setActive] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const auth = useContext(AuthContext);

  const toggleActive = () => {
    setActive(!active);
  };

  const toggleLogin = () => {
    setShowLogin(!showLogin);
  };

  const toggleSignup = () => {
    setShowSignup(!showSignup);
  };

  const toggleShowLogout = () => {
    setShowLogout(!showLogout);
  };

  const logout = () => {
    auth.logout();
    toggleActive();
    toggleShowLogout();
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
                  href="/postGallery/tech"
                  className="navbar-link hover:underline"
                >
                  Tech Post
                </a>
              </li>

              <li className="navbar-item">
                <a
                  href="/postGallery/life"
                  className="navbar-link hover:underline"
                >
                  Life Post
                </a>
              </li>

              {/* <li className="navbar-item">
                <a href="/info" className="navbar-link hover:underline">
                  Info
                </a>
              </li> */}

              <li className="navbar-item">
                <a
                  href="https://main.d29115wyne7x0v.amplifyapp.com/"
                  className="navbar-link hover:underline"
                >
                  Portfolio
                </a>
              </li>
              {!auth.isLoggedIn && (
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
              {auth.isLoggedIn && (
                <>
                  <hr />
                  <li className="navbar-item login-btn">
                    <button
                      className="navbar-link-button"
                      onClick={toggleShowLogout}
                    >
                      logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </nav>

          <div className="wrapper">
            {!auth.isLoggedIn && (
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

            {!auth.isLoggedIn && (
              <button to="#" className="btn" onClick={toggleLogin}>
                login
              </button>
            )}
            {auth.isLoggedIn && (
              <button to="#" className="btn" onClick={toggleShowLogout}>
                logout
              </button>
            )}

            {auth.isLoggedIn && (
              <div className="profile-container">
                <img src={auth.image} alt="avatar" />
              </div>
            )}
          </div>
        </div>
      </header>
      <LoginModal show={showLogin} onHide={toggleLogin} />
      <SignupModal show={showSignup} onHide={toggleSignup} />
      <MessageModal
        mes={"Are you sure to logout?"}
        show={showLogout}
        onClear={toggleShowLogout}
        handler={logout}
      />
    </>
  );
}
