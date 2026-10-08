import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function LOGIN() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (user) =>
        user.email.toLowerCase() === email.toLowerCase() &&
        user.password === password
    );

    if (!user) {
      alert(
        "Invalid email or password. Please create an account first."
      );
      return;
    }

    localStorage.setItem("isLoggedIn", "true");

    localStorage.setItem(
      "currentUser",
      JSON.stringify(user)
    );

    alert("Login successful!");

    navigate("/");

    window.location.reload();
  }

  return (
    <main className="login-page">

      <div className="login-container">

        <div className="login-left">

          <p className="login-label">
            APARTMENT MANAGEMENT SYSTEM
          </p>

          <h1>
            WELCOME
            <br />
            BACK.
          </h1>

          <p>
            Login to manage your residential
            community, residents, maintenance
            requests, notices and facilities.
          </p>

        </div>

        <div className="login-card">

          <h2>LOGIN</h2>

          <p className="login-subtitle">
            Sign in to access your community dashboard.
          </p>

          <form onSubmit={handleLogin}>

            <div className="input-group">

              <label>Email Address</label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

            </div>

            <div className="input-group">

              <label>Password</label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

            </div>

            <button
              type="submit"
              className="login-button"
            >
              LOGIN
            </button>

          </form>

          <p className="account-link">
            Don't have an account?{" "}

            <Link to="/signup">
              SIGNUP
            </Link>
          </p>

        </div>

      </div>

    </main>
  );
}