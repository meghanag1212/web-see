import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function SIGNUP() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup(e) {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (
      !trimmedName ||
      !trimmedEmail ||
      !password ||
      !confirmPassword
    ) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage(
        "Password must contain at least 6 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: trimmedEmail,
        password,
        options: {
          data: {
            full_name: trimmedName,
          },
        },
      });

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      if (!data.user) {
        setErrorMessage(
          "Account creation failed. Please try again."
        );
        return;
      }

      if (data.session) {
        // Signup returned an active Supabase session.
        // The protected route can now recognize the user.
        navigate("/", { replace: true });
      } else {
        // Email confirmation is enabled in Supabase.
        setSuccessMessage(
          "Your account has been created. Please check your email and confirm your account before logging in."
        );
      }
    } catch (error) {
      console.error("Signup error:", error);

      setErrorMessage(
        "Something went wrong. Please try again."
      );
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
            CREATE
            <br />
            ACCOUNT.
          </h1>

          <p>
            Create your account to manage
            residents, maintenance requests,
            notices and community facilities.
          </p>
        </div>

        {/* SIGNUP FORM */}
        <div className="login-card">
          <h2>SIGNUP</h2>

          <p className="login-subtitle">
            Create a new account to get started.
          </p>

          <form onSubmit={handleSignup}>
            <div className="input-group">
              <label htmlFor="signup-name">
                Full Name
              </label>

              <input
                id="signup-name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="signup-email">
                Email Address
              </label>

              <input
                id="signup-email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="signup-password">
                Password
              </label>

              <input
                id="signup-password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                minLength={6}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="confirm-password">
                Confirm Password
              </label>

              <input
                id="confirm-password"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                autoComplete="new-password"
                minLength={6}
                required
              />
            </div>

            {errorMessage && (
              <p
                role="alert"
                className="error-message"
              >
                {errorMessage}
              </p>
            )}

            {successMessage && (
              <p
                role="status"
                className="success-message"
              >
                {successMessage}
                {" "}
                <Link to="/login">Go to Login</Link>
              </p>
            )}

            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading
                ? "CREATING ACCOUNT..."
                : "CREATE ACCOUNT"}
            </button>
          </form>

          <p className="account-link">
            Already have an account?{" "}
            <Link to="/login">LOGIN</Link>
          </p>
        </div>
      </div>
    </main>
  );
}