import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { Link, useNavigate } from "react-router";
import "./auth.css";

export default function Register() {
  const [error, setError] = useState(null);

  const { register } = useAuth();
  const navigate = useNavigate();

  async function handleRegister(formData) {
    const email = formData.get("email");
    const username = formData.get("username");
    const password = formData.get("password");
    try {
      if (!username || !password) {
        throw Error("Email, username, and password is required");
      }
      await register({ email, username, password });
      navigate("/account");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div id="authPage">
      <form action={handleRegister}>
        <h2>Create Account</h2>
        <label>
          <span>Email</span>
          <input type="text" name="email" />
        </label>
        <label>
          <span>Username</span>
          <input type="text" name="username" />
        </label>
        <label>
          <span>Password</span>
          <input type="password" name="password" />
        </label>
        {error ? <output>{error}</output> : ""}
        <button type="submit">Register</button>
        <Link to="/login">{"Already have an account? Login here!"}</Link>
      </form>
    </div>
  );
}
