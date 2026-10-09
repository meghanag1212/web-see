import { useState } from "react";
import {
  useNavigate,
  Link,
  useLocation,
} from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function LOGIN() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();

    setErrorMessage("");

    if (!email.trim() || !password) {
      setErrorMessage("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      const { data, error } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

      if (error) {
        setErrorMessage("Invalid email or password.");
        console.error("Login error:", error.message);
        return;
      }

      if (!data.session || !data.user) {
        setErrorMessage(
          "Login could not be completed. Please try again."
        );
        return;
      }

      // Return to the protected page the user originally requested.
      const requestedPath = location.state?.from;
      const destination =
        requestedPath?.pathname &&
        requestedPath.pathname.startsWith("/") &&
        !requestedPath.pathname.startsWith("//")
          ? requestedPath.pathname +
            (requestedPath.search || "") +
            (requestedPath.hash || "")
          : "/";

      navigate(destination, { replace: true });
    } catch (error) {
      console.error("Unexpected login error:", error);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-page">
      <div className="login-container">

        {/* LEFT SIDE */}
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

        {/* LOGIN FORM */}
        <div className="login-card">
          <h2>LOGIN</h2>

          <p className="login-subtitle">
            Sign in to access your community dashboard.
          </p>

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label htmlFor="login-email">
                Email Address
              </label>

              <input
                id="login-email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="login-password">
                Password
              </label>

              <input
                id="login-password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>

            {errorMessage && (
              <p role="alert" className="error-message">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading ? "LOGGING IN..." : "LOGIN"}
            </button>
          </form>

          <p className="account-link">
            Don't have an account?{" "}
            <Link to="/signup">SIGNUP</Link>
          </p>
        </div>
      </div>
    </main>
  );
}