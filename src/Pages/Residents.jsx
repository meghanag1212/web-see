import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function Residents() {
  const [name, setName] = useState("");
  const [apartment, setApartment] = useState("");
  const [phone, setPhone] = useState("");
  const [residents, setResidents] = useState([]);

  useEffect(() => {
    fetchResidents();
  }, []);

  async function fetchResidents() {
    const { data, error } = await supabase
      .from("residents")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setResidents(data || []);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !apartment || !phone) {
      alert("Please fill all fields");
      return;
    }

    if (phone.length !== 10) {
      alert("Phone number must contain exactly 10 digits");
      return;
    }

    const { data, error } = await supabase
      .from("residents")
      .insert([
        {
          name: name,
          apartment: apartment,
          phone: phone,
        },
      ])
      .select();

    if (error) {
      alert("Error: " + error.message);
      return;
    }

    setResidents([...data, ...residents]);

    setName("");
    setApartment("");
    setPhone("");

    alert("Resident added successfully!");
  };

  return (
    <div className="management-page">

      <div className="page-heading">
        <p className="section-label">APARTMENT MANAGEMENT</p>

        <h1>Residents</h1>

        <p>
          Manage apartment residents and their contact information.
        </p>
      </div>

      <div className="management-grid">

        <div className="form-card">
          <h2>Add Resident</h2>

          <form onSubmit={handleSubmit} className="management-form">

            <div className="input-group">
              <label>Resident Name</label>

              <input
                type="text"
                placeholder="Enter resident name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Apartment Number</label>

              <input
                type="text"
                placeholder="Enter apartment number"
                value={apartment}
                onChange={(e) => setApartment(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Phone Number</label>

              <input
                type="text"
                placeholder="Enter 10 digit phone number"
                value={phone}
                maxLength="10"
                onChange={(e) => {
                  if (/^\d*$/.test(e.target.value)) {
                    setPhone(e.target.value);
                  }
                }}
              />
            </div>

            <button type="submit">
              Add Resident
            </button>

          </form>
        </div>

        <div className="list-card">
          <h2>Residents List</h2>

          {residents.length === 0 ? (
            <p>No residents added yet.</p>
          ) : (
            residents.map((resident) => (
              <div className="data-card" key={resident.id}>

                <h3>{resident.name}</h3>

                <p>
                  <strong>Apartment:</strong>{" "}
                  {resident.apartment}
                </p>

                <p>
                  <strong>Phone:</strong>{" "}
                  {resident.phone}
                </p>

              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}