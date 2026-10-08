import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function Facilities() {

  const [name, setName] = useState("");
  const [description, setDescription] =
    useState("");

  const [status, setStatus] =
    useState("Available");

  const [facilities, setFacilities] =
    useState([]);

  useEffect(() => {
    fetchFacilities();
  }, []);

  async function fetchFacilities() {

    const { data, error } = await supabase
      .from("facilities")
      .select("*")
      .order("id", {
        ascending: true
      });

    if (error) {
      console.error(error);
      alert("Unable to load facilities.");
      return;
    }

    setFacilities(data || []);
  }

  async function handleSubmit(e) {

    e.preventDefault();

    if (!name || !description) {
      alert("Please fill all fields.");
      return;
    }

    const { data, error } = await supabase
      .from("facilities")
      .insert([
        {
          name: name,
          description: description,
          status: status
        }
      ])
      .select();

    if (error) {
      console.error(error);
      alert("Error: " + error.message);
      return;
    }

    setFacilities([
      ...facilities,
      ...data
    ]);

    setName("");
    setDescription("");
    setStatus("Available");

    alert(
      "Facility added successfully!"
    );
  }

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
          Manage facilities available
          to apartment residents.
        </p>

      </div>

      <div className="management-grid">

        <div className="form-card">

          <h2>
            Add Facility
          </h2>

          <form
            onSubmit={handleSubmit}
            className="management-form"
          >

            <div className="input-group">

              <label>
                Facility Name
              </label>

              <input
                type="text"
                placeholder="Example: Swimming Pool"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />

            </div>

            <div className="input-group">

              <label>
                Description
              </label>

              <textarea
                rows="5"
                placeholder="Describe the facility"
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
              />

            </div>

            <div className="input-group">

              <label>
                Status
              </label>

              <select
                value={status}
                onChange={(e) =>
                  setStatus(
                    e.target.value
                  )
                }
              >

                <option value="Available">
                  Available
                </option>

                <option value="Unavailable">
                  Unavailable
                </option>

                <option value="Maintenance">
                  Maintenance
                </option>

              </select>

            </div>

            <button type="submit">
              Add Facility
            </button>

          </form>

        </div>

        <div className="list-card">

          <h2>
            Available Facilities
          </h2>

          {facilities.length === 0 ? (

            <p>
              No facilities available.
            </p>

          ) : (

            facilities.map((facility) => (

              <div
                className="data-card"
                key={facility.id}
              >

                <h3>
                  {facility.name}
                </h3>

                <p>
                  {facility.description}
                </p>

                <p>
                  <strong>
                    Status:
                  </strong>{" "}
                  {facility.status}
                </p>

              </div>

            ))

          )}

        </div>

      </div>

    </main>
  );
}