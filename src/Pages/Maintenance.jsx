import { useState } from "react";

export default function Maintenance() {

  const [requests, setRequests] = useState(() => {
    return JSON.parse(
      localStorage.getItem("maintenanceRequests")
    ) || [];
  });

  const [resident, setResident] = useState("");
  const [apartment, setApartment] = useState("");
  const [issue, setIssue] = useState("");

  function submitRequest(e) {

    e.preventDefault();

    if (!resident || !apartment || !issue) {
      alert("Please fill all fields.");
      return;
    }

    const newRequest = {
      id: Date.now(),
      resident,
      apartment,
      issue,
      status: "Pending"
    };

    const updatedRequests = [
      newRequest,
      ...requests
    ];

    setRequests(updatedRequests);

    localStorage.setItem(
      "maintenanceRequests",
      JSON.stringify(updatedRequests)
    );

    setResident("");
    setApartment("");
    setIssue("");
  }

  return (

    <main className="management-page">

      <div className="page-heading">

        <p className="section-label">
          APARTMENT MANAGEMENT
        </p>

        <h1>
          Maintenance
        </h1>

        <p>
          Report and track maintenance requests.
        </p>

      </div>


      <div className="management-grid">

        <div className="form-card">

          <h2>
            New Request
          </h2>

          <form onSubmit={submitRequest}>

            <div className="input-group">

              <label>
                Resident Name
              </label>

              <input
                type="text"
                placeholder="Enter resident name"
                value={resident}
                onChange={(e) =>
                  setResident(e.target.value)
                }
              />

            </div>


            <div className="input-group">

              <label>
                Apartment Number
              </label>

              <input
                type="text"
                placeholder="Example: B-302"
                value={apartment}
                onChange={(e) =>
                  setApartment(e.target.value)
                }
              />

            </div>


            <div className="input-group">

              <label>
                Maintenance Issue
              </label>

              <textarea
                rows="5"
                placeholder="Describe the problem..."
                value={issue}
                onChange={(e) =>
                  setIssue(e.target.value)
                }
              ></textarea>

            </div>


            <button
              type="submit"
              className="submit-button"
            >
              Submit Request
            </button>

          </form>

        </div>


        <div className="list-card">

          <h2>
            Maintenance Requests
          </h2>

          {requests.length === 0 ? (

            <div className="empty-state">

              <p>
                No maintenance requests yet.
              </p>

            </div>

          ) : (

            <div className="resident-list">

              {requests.map((request) => (

                <div
                  className="resident-item"
                  key={request.id}
                >

                  <div>

                    <h3>
                      {request.issue}
                    </h3>

                    <p>
                      Resident: {request.resident}
                    </p>

                    <p>
                      Apartment: {request.apartment}
                    </p>

                    <p className="status">
                      Status: {request.status}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </main>
  );
}