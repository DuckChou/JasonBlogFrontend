import { useState, useContext } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import { useNavigate } from "react-router-dom";


import Offcanvas from "react-bootstrap/Offcanvas";

import "./AdminHeader.css";

export default function AdminHeader() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const navHandler = (route) => {
    setShowMenu(false);
    navigate(route);
  };

  const logoutHandler = () => {
    setShowMenu(false);
    auth.logout();
  };

  return (
    <>
      <header className="header section">
        <div className="container">
          <a href="/" className="title">
            Jason's Blog Admin
          </a>

          {auth.isLoggedIn && (
            <>
              <button
                variant="primary"
                onClick={toggleMenu}
                className="me-5 menu-button"
              >
                <span className="span one"></span>
                <span className="span two"></span>
                <span className="span three"></span>
              </button>
              {/* </div> */}
              <Offcanvas show={showMenu} onHide={toggleMenu} placement="end">
                <Offcanvas.Header closeButton className="pe-5">
                  <Offcanvas.Title className="offcanvas-header">
                    Admin Menu
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <ul className="admin-header-ul">
                    <li onClick={() => navHandler("/admin/managePosts")}>
                      Manage Posts
                    </li>
                    <li onClick={() => navHandler("/admin/manageReviews")}>
                      Manage Reviews
                    </li>
                    <li onClick={() => navHandler("/admin/newPost")}>
                      New Post
                    </li>
                    <li className="text-danger" onClick={logoutHandler}>
                      Logout
                    </li>
                  </ul>
                </Offcanvas.Body>
              </Offcanvas>
            </>
          )}
        </div>
      </header>
    </>
  );
}
