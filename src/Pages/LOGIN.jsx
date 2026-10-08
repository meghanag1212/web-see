import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function LOGIN() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    // Check if fields are empty
    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

    // Login with Supabase
    const { data, error } =
      await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password
      });

    // If login fails
    if (error) {
      alert("Invalid email or password.");
      console.log(error.message);
      return;
    }

    // Make sure user exists
    if (!data.user) {
      alert("Login failed. Please try again.");
      return;
    }

    // Login successful
    alert("Login successful!");

    // Go to Home page
    navigate("/");
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

            {/* EMAIL */}

            <div className="input-group">

              <label>
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

            </div>


            {/* PASSWORD */}

            <div className="input-group">

              <label>
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

            </div>


            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="login-button"
            >
              LOGIN
            </button>

          </form>


          {/* SIGNUP LINK */}

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