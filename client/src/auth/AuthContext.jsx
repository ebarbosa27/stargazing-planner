import { createContext, useContext, useEffect, useState } from "react";
import { API } from "../api/ApiContext";
import Cookies from "js-cookie";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(Cookies.get("userToken") || null);

  useEffect(() => {
    console.log(token);
  }, [token]);

  async function register({ email, username, password }) {
    const response = await fetch(API + "/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, username, password }),
    });

    const result = await response.json();
    if (!response.ok) throw result;

    setToken(result.token);
    Cookies.set("userToken", result.token, { expires: 5 });
  }

  async function login({ username, password }) {
    const response = await fetch(API + "/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const result = await response.json();
    if (!response.ok) throw result;
    setToken(result.token);
    Cookies.set("userToken", result.token, { expires: 5 });
  }

  function logout() {
    setToken(null);
    Cookies.remove("userToken");
  }

  return (
    <AuthContext.Provider value={{ token, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within the AuthProvider");
  return context;
}
