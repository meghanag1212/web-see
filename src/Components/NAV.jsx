import { Link, useNavigate } from "react-router-dom";

export default function NAV() {
  const navigate = useNavigate();

  const isLoggedIn =
    localStorage.getItem("isLoggedIn") === "true";

  function handleLogout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");

    alert("You have been logged out.");

    navigate("/login");

    window.location.reload();
  }

  return (
    <nav className="navbar">

      <Link to="/" className="logo">
        HOMEHUB
      </Link>

      <div className="nav-links">

        <Link to="/">
          Home
        </Link>

        <Link to="/residents">
          Residents
        </Link>

        <Link to="/maintenance">
          Maintenance
        </Link>

        <Link to="/notices">
          Notices
        </Link>

        <Link to="/facilities">
          Facilities
        </Link>

        {!isLoggedIn && (
          <>
            <Link
              to="/login"
              className="login-nav"
            >
              LOGIN
            </Link>

            <Link
              to="/signup"
              className="signup-nav"
            >
              SIGNUP
            </Link>
          </>
        )}

        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="logout-button"
          >
            LOGOUT
          </button>
        )}

      </div>

    </nav>
  );
}