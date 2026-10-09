
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function NAV() {
  const navigate = useNavigate();
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    let active = true;

    async function checkSession() {
      const { data, error } = await supabase.auth.getSession();

      if (active) {
        setSession(error ? null : data.session);
      }
    }

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (active) {
        setSession(newSession);
      }
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert("Logout failed: " + error.message);
      return;
    }

    navigate("/login", { replace: true });
  }

  // Avoid showing the wrong buttons while checking login status.
  if (session === undefined) {
    return (
      <nav className="navbar">
        <Link to="/" className="logo">
          HOMEHUB
        </Link>
      </nav>
    );
  }

  const isLoggedIn = Boolean(session);

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        HOMEHUB
      </Link>

      <div className="nav-links">
        {isLoggedIn && (
          <>
            <Link to="/">Home</Link>
            <Link to="/residents">Residents</Link>
            <Link to="/maintenance">Maintenance</Link>
            <Link to="/notices">Notices</Link>
            <Link to="/facilities">Facilities</Link>

            <button
              type="button"
              onClick={handleLogout}
              className="logout-button"
            >
              LOGOUT
            </button>
          </>
        )}

        {!isLoggedIn && (
          <>
            <Link to="/login" className="login-nav">
              LOGIN
            </Link>

            <Link to="/signup" className="signup-nav">
              SIGNUP
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

