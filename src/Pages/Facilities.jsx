const facilities = [
  {
    name: "Swimming Pool",
    description:
      "A community swimming pool available for residents."
  },
  {
    name: "Gymnasium",
    description:
      "Fitness facilities for residents to maintain a healthy lifestyle."
  },
  {
    name: "Clubhouse",
    description:
      "A common area for community gatherings and events."
  },
  {
    name: "Children's Play Area",
    description:
      "A safe recreational space for children."
  },
  {
    name: "Parking Area",
    description:
      "Dedicated parking space for residents and visitors."
  },
  {
    name: "Community Hall",
    description:
      "A multipurpose hall for meetings and celebrations."
  }
];

export default function Facilities() {

  return (

    <main className="management-page">

      <div className="page-heading">

        <p className="section-label">
          COMMUNITY FACILITIES
        </p>

        <h1>
          Facilities
        </h1>

        <p>
          Explore the facilities available in
          your residential community.
        </p>

      </div>


      <div className="facility-grid">

        {facilities.map((facility) => (

          <div
            className="facility-card"
            key={facility.name}
          >

            <h2>
              {facility.name}
            </h2>

            <p>
              {facility.description}
            </p>

            <button className="facility-button">
              Available
            </button>

          </div>

        ))}

      </div>

    </main>
  );
}
