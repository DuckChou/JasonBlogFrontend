import Header from "./components/view/Header";
import Home from "./screens/Client/Home";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";
import { jwtDecode } from "jwt-decode";

import PostScreen from "./screens/Client/PostScreen";
import TechPostGalleryScreen from "./screens/Client/TechPostGalleryScreen";
import LifePostGalleryScreen from "./screens/Client/LifePostGalleryScreen";
import Footer from "./components/view/Footer";
import NotFound from "./screens/Client/NotFound";

import AdminManagePosts from "./screens/Admin/AdminManagePosts";
import AdminNewPost from "./screens/Admin/AdminNewPost";
import AdminHeader from "./components/view/AdminHeader";
import AdminLogin from "./screens/Admin/AdminLogin";
import AdminUpdatePost from "./screens/Admin/AdminUpdatePost";
import AdminManageReviews from "./screens/Admin/AdminManageReviews";
import TokenRedirect from "./screens/Client/TokenRedirect";

function AdminRoutes() {
  const auth = useContext(AuthContext);

  if (!auth.isLoggedIn||!jwtDecode(auth.token).isAdmin) {
    return (
      <Routes>
        <Route path="/AdminLogin" element={<AdminLogin />} />

        <Route
          path="*"
          element={
            <>
              <NotFound
                mes={"login first to access admin console. "}
                nav={"/admin/AdminLogin"}
              />
            </>
          }
        />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/managePosts" element={<AdminManagePosts />} />
      <Route path="/manageReviews" element={<AdminManageReviews />} />
      <Route path="/newPost" element={<AdminNewPost />} />
      <Route path="/updatePost/:postId" element={<AdminUpdatePost />} />
      <Route
        path="/AdminLogin"
        element={
          <>
            <NotFound
              mes={"Already Login, redirect to the admin console. "}
              nav={"/admin/managePosts"}
            />
          </>
        }
      />
      <Route
        path="/*"
        element={
          <>
            <NotFound
              mes={"404: Page not found. "}
              nav={"/admin/managePosts"}
            />
          </>
        }
      />
      {/* // Add more admin routes here */}
    </Routes>
  );
}

function AppContent() {
  const location = useLocation();

  const { token, login, logout, userId, image } = useAuth(location);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        userId: userId,
        token: token,
        image: image,
        login: login,
        logout: logout,
      }}
    >
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
              </>
            }
          />
          <Route
            path="/postGallery/tech"
            element={
              <>
                <Header />
                <TechPostGalleryScreen />
              </>
            }
          />
          <Route
            path="/postGallery/life"
            element={
              <>
                <Header />
                <LifePostGalleryScreen />
              </>
            }
          />
          <Route
            path="/post/:id"
            element={
              <>
                <Header />
                <PostScreen />
              </>
            }
          />
          {/* <Route path="/info" element={<InfoScreen />} /> */}
          <Route
            path="/admin/*"
            element={
              <>
                <AdminHeader />
                <AdminRoutes />
                {/* <Outlet /> */}
              </>
            }
          />
          <Route path="/:tokenId" element={<TokenRedirect />} />
          <Route
            path="*"
            element={
              <>
                <Header />
                <NotFound mes={"404: Page not found. "} nav={"/"} />
              </>
            }
          />
        </Routes>
        <Footer />
      </div>
    </AuthContext.Provider>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
