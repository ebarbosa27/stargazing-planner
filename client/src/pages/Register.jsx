import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { Link, useNavigate } from "react-router";

export default function Register() {
  const [error, setError] = useState(null);

  const { register } = useAuth();
  const navigate = useNavigate();

  async function handleRegister(formData) {
    const username = formData.get("username");
    const password = formData.get("password");
    try {
      if (!username || !password) {
        throw Error("Email and password is required");
      }
      await register({ username, password });
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div id="accountPage">
      <h2>Register</h2>
      <form action={handleRegister}>
        <label>
          <span>username</span>
          <input type="text" name="username" />
        </label>
        <label>
          <span>password</span>
          <input type="password" name="password" />
        </label>
        <button type="submit">Register</button>
      </form>
      {error ? <output>{error}</output> : ""}
      <Link to="/login">{"Already have an account? Login here!"}</Link>
    </div>
  );
}
