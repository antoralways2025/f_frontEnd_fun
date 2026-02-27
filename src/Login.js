import { useState } from "react";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://f-backend-fun.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Login successful ✅");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Server error");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Facebook</h1>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email or phone number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Log In</button>
        </form>

        {message && <p style={{ marginTop: "10px" }}>{message}</p>}

        <a href="#">Forgotten password?</a>
        <hr />
        <button className="create-account">Create New Account</button>
      </div>
    </div>
  );
}

export default Login;