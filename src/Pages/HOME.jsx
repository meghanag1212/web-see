import { Link } from "react-router-dom";

export default function HOME() {
  return (
    <main>

      <section className="hero">

        <div className="hero-content">

          <p className="hero-label">
            APARTMENT MANAGEMENT SYSTEM
          </p>

          <h1>
            MANAGE.
            <br />
            CONNECT.
            <br />
            <span>SIMPLIFY.</span>
          </h1>

          <p className="hero-description">
            A simple apartment management system
            designed to manage residents,
            maintenance requests, notices and
            community facilities in one place.
          </p>

          <div className="hero-buttons">

            <Link
              to="/residents"
              className="primary-button"
            >
              Manage Residents
            </Link>

            <Link
              to="/notices"
              className="secondary-button"
            >
              View Notices
            </Link>

          </div>

        </div>

      </section>


      <section className="info-section">

        <div className="section-heading">

          <p className="section-label">
            OUR SERVICES
          </p>

          <h2>
            Everything your community needs.
          </h2>

        </div>


        <div className="info-grid">

          <div className="info-card">

            <div className="card-number">
              01
            </div>

            <h3>
              Residents
            </h3>

            <p>
              Manage resident information,
              apartment numbers and contact
              details efficiently.
            </p>

            <Link to="/residents">
              View Residents →
            </Link>

          </div>


          <div className="info-card">

            <div className="card-number">
              02
            </div>

            <h3>
              Maintenance
            </h3>

            <p>
              Report and track maintenance
              requests raised by residents.
            </p>

            <Link to="/maintenance">
              View Requests →
            </Link>

          </div>


          <div className="info-card">

            <div className="card-number">
              03
            </div>

            <h3>
              Notices
            </h3>

            <p>
              Keep residents updated with
              important community announcements.
            </p>

            <Link to="/notices">
              View Notices →
            </Link>

          </div>


          <div className="info-card">

            <div className="card-number">
              04
            </div>

            <h3>
              Facilities
            </h3>

            <p>
              View and manage facilities available
              within the residential community.
            </p>

            <Link to="/facilities">
              View Facilities →
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}