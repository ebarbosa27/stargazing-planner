import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { Link, useNavigate } from "react-router";
import "./auth.css";

export default function Login() {
  const [error, setError] = useState(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleLogin(formData) {
    const username = formData.get("username");
    const password = formData.get("password");
    try {
      if (!username || !password) {
        throw Error("Username and password is required");
      }
      await login({ username, password });
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div id="accountPage">
      <form action={handleLogin}>
        <h2>Login</h2>
        <label>
          <span>Username</span>
          <input type="text" name="username" />
        </label>
        <label>
          <span>Password</span>
          <input type="password" name="password" />
        </label>
        {error ? <output>{error}</output> : ""}
        <button type="submit">Login</button>
        <Link to="/register">{"Dont't have an account? Register here!"}</Link>
      </form>
    </div>
  );
}
