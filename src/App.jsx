import { useState } from "react";
import "./App.css";

function App() {
  const [mode, setMode] = useState(null); // login | signup
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint =
      mode === "login"
        ? "http://127.0.0.1:8000/login"
        : "http://127.0.0.1:8000/signup";

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userId,
        password: password
      })
    });

    const data = await response.json();
    alert(data.message);
  };

  return (
    <div className="page">
      <div className="card">
        <h1 className="title">SBridge </h1>
        <p className="subtitle">
          Get Ready to Connect with experts 
        </p>

        {!mode && (
          <div className="button-group">
            <button
              className="btn login-btn"
              onClick={() => setMode("login")}
            >
              Login
            </button>

            <button
              className="btn signup-btn"
              onClick={() => setMode("signup")}
            >
              Sign Up
            </button>
          </div>
        )}

        {mode && (
          <form className="form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button className="btn submit-btn" type="submit">
              {mode === "login" ? "Login" : "Create Account"}
            </button>

            <p className="back" onClick={() => setMode(null)}>
              ← Back
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default App;
