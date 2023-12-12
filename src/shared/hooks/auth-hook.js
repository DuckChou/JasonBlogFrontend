import { useState, useCallback, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
let logoutTimer;

export const useAuth = (location) => {
  const [token, setToken] = useState();
  const [userId, setUserId] = useState(false);
  const [image, setImage] = useState();
  const [tokenExpirationDate, setTokenExpirationDate] = useState();

  // singup的话会提供expirationDate
  // 第一次login不会提供expirationDate,重新登录的话会提供expirationDate
  const login = useCallback((uid, token, image, expirationDate) => {
    setUserId(uid);
    setToken(token);
    setImage(image);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        image: image,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback((uid, token) => {
    setUserId(null);
    setToken(null);
    setImage(null);
    setTokenExpirationDate(null);
    localStorage.removeItem("userData");
  }, []);

  // 自动登录
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));

    if (location.pathname.startsWith("/admin/")) {
      if (
        storedData &&
        storedData.token &&
        new Date(storedData.expiration) > new Date() &&
        jwtDecode(storedData.token).isAdmin
      ) {
        login(
          storedData.userId,
          storedData.token,
          storedData.image,
          new Date(storedData.expiration)
        );
      }
    } else {
      if (
        storedData &&
        storedData.token &&
        new Date(storedData.expiration) > new Date()
      ) {
        login(
          storedData.userId,
          storedData.token,
          storedData.image,
          new Date(storedData.expiration)
        );
      }
    }
  }, [login, location.pathname]);

  // 自动登出
  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    }

    return () => {
      clearTimeout(logoutTimer);
    };
  }, [token, logout, tokenExpirationDate]);

  return { token, login, logout, userId, image };
};
