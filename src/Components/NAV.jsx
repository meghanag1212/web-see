import { Link } from "react-router-dom";

export default function NAV() {
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

      </div>

    </nav>
  );
}