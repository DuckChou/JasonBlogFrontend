import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  token: null,
  image: null,
  login: () => {},
  logout: () => {},
});
