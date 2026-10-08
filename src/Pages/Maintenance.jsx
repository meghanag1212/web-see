import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function Maintenance() {

  const [resident, setResident] = useState("");
  const [apartment, setApartment] = useState("");
  const [issue, setIssue] = useState("");

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  async function fetchRequests() {

    const { data, error } = await supabase
      .from("maintenance_requests")
      .select("*")
      .order("id", {
        ascending: false
      });

    if (error) {
      console.error(error);
      alert("Unable to load maintenance requests.");
      return;
    }

    setRequests(data || []);
  }

  async function handleSubmit(e) {

    e.preventDefault();

    if (!resident || !apartment || !issue) {
      alert("Please fill all fields.");
      return;
    }

    const { data, error } = await supabase
      .from("maintenance_requests")
      .insert([
        {
          resident_name: resident,
          apartment: apartment,
          issue: issue,
          status: "Pending"
        }
      ])
      .select();

    if (error) {
      console.error(error);
      alert("Error: " + error.message);
      return;
    }

    setRequests([
      ...data,
      ...requests
    ]);

    setResident("");
    setApartment("");
    setIssue("");

    alert(
      "Maintenance request submitted!"
    );
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
          Report and track apartment
          maintenance problems.
        </p>

      </div>

      <div className="management-grid">

        <div className="form-card">

          <h2>
            Submit Request
          </h2>

          <form
            onSubmit={handleSubmit}
            className="management-form"
          >

            <div className="input-group">

              <label>
                Resident Name
              </label>

              <input
                type="text"
                placeholder="Enter resident name"
                value={resident}
                onChange={(e) =>
                  setResident(
                    e.target.value
                  )
                }
              />

            </div>

            <div className="input-group">

              <label>
                Apartment Number
              </label>

              <input
                type="text"
                placeholder="Enter apartment number"
                value={apartment}
                onChange={(e) =>
                  setApartment(
                    e.target.value
                  )
                }
              />

            </div>

            <div className="input-group">

              <label>
                Describe the Issue
              </label>

              <textarea
                rows="5"
                placeholder="Describe the maintenance issue"
                value={issue}
                onChange={(e) =>
                  setIssue(
                    e.target.value
                  )
                }
              />

            </div>

            <button type="submit">
              Submit Request
            </button>

          </form>

        </div>

        <div className="list-card">

          <h2>
            Maintenance Requests
          </h2>

          {requests.length === 0 ? (

            <p>
              No maintenance requests yet.
            </p>

          ) : (

            requests.map((request) => (

              <div
                className="data-card"
                key={request.id}
              >

                <h3>
                  {request.issue}
                </h3>

                <p>
                  <strong>
                    Resident:
                  </strong>{" "}
                  {request.resident_name}
                </p>

                <p>
                  <strong>
                    Apartment:
                  </strong>{" "}
                  {request.apartment}
                </p>

                <p>
                  <strong>
                    Status:
                  </strong>{" "}
                  {request.status}
                </p>

              </div>

            ))

          )}

        </div>

      </div>

    </main>
  );
}