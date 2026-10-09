import { Link } from "react-router-dom";

export default function HOME() {
  return (
    <main className="home-page">

      <section className="hero-section">

        <div className="hero-content">

          <p className="section-label">
            APARTMENT MANAGEMENT SYSTEM
          </p>

          <h1>
            MANAGE YOUR 
            <br />
            COMMUNITY.
          </h1>

          <p className="hero-description">
            A simple platform to manage residents,
            maintenance requests, notices and
            apartment facilities.
          </p>

          <div className="hero-buttons">

            <Link
              to="/residents"
              className="hero-button"
            >
              MANAGE RESIDENTS
            </Link>

            <Link
              to="/maintenance"
              className="hero-button secondary"
            >
              MAINTENANCE
            </Link>

          </div>

        </div>

      </section>

      <section className="home-features">

        <div className="feature-card">
          <h2>Residents</h2>

          <p>
            Add and manage apartment resident
            information.
          </p>
        </div>

        <div className="feature-card">
          <h2>Maintenance</h2>

          <p>
            Submit and track maintenance requests.
          </p>
        </div>

        <div className="feature-card">
          <h2>Notices</h2>

          <p>
            Create important community notices.
          </p>
        </div>

        <div className="feature-card">
          <h2>Facilities</h2>

          <p>
            View available apartment facilities.
          </p>
        </div>

      </section>

    </main>
  );
}