/** @format */
import * as React from "react";
import { login, getMe, setToken, clearToken, getToken } from "../api/strapi";

const AuthContext = React.createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  // On mount, check if a token exists and validate it
  React.useEffect(() => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }

    getMe()
      .then((res) => setUser(res.data))
      .catch(() => {
        clearToken();
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const signIn = async (identifier, password) => {
    const res = await login(identifier, password);
    setToken(res.data.jwt);
    setUser(res.data.user);
    return res.data.user;
  };

  const signOut = () => {
    clearToken();
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: Boolean(user),
    loading,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  return (
    ctx || {
      user: null,
      isAuthenticated: false,
      loading: false,
      signIn: async () => {
        throw new Error("AuthProvider not available");
      },
      signOut: () => {},
    }
  );
}
