import { useState } from "react";

export default function Residents() {

  const [residents, setResidents] = useState(() => {
    return JSON.parse(
      localStorage.getItem("residents")
    ) || [];
  });

  const [name, setName] = useState("");
  const [apartment, setApartment] = useState("");
  const [phone, setPhone] = useState("");


  function addResident(e) {

    e.preventDefault();


    if (!name || !apartment || !phone) {

      alert("Please fill all fields.");

      return;
    }


    if (phone.length !== 10) {

      alert(
        "Phone number must contain exactly 10 digits."
      );

      return;
    }


    const newResident = {

      id: Date.now(),

      name,

      apartment,

      phone

    };


    const updatedResidents = [

      ...residents,

      newResident

    ];


    setResidents(updatedResidents);


    localStorage.setItem(

      "residents",

      JSON.stringify(updatedResidents)

    );


    setName("");

    setApartment("");

    setPhone("");

  }


  return (

    <main className="management-page">


      <div className="page-heading">

        <p className="section-label">
          APARTMENT MANAGEMENT
        </p>


        <h1>
          Residents
        </h1>


        <p>
          Manage residents and their apartment
          information.
        </p>

      </div>



      <div className="management-grid">


        <div className="form-card">

          <h2>
            Add Resident
          </h2>


          <form onSubmit={addResident}>


            <div className="input-group">

              <label>
                Resident Name
              </label>


              <input
                type="text"
                placeholder="Enter resident name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />

            </div>



            <div className="input-group">

              <label>
                Apartment Number
              </label>


              <input
                type="text"
                placeholder="Example: A-204"
                value={apartment}
                onChange={(e) =>
                  setApartment(e.target.value)
                }
              />

            </div>



            <div className="input-group">

              <label>
                Phone Number
              </label>


              <input
                type="tel"
                placeholder="Enter 10-digit phone number"
                value={phone}
                maxLength="10"
                onChange={(e) => {

                  const value = e.target.value;


                  if (/^\d*$/.test(value)) {

                    setPhone(value);

                  }

                }}
              />

            </div>



            <button
              type="submit"
              className="submit-button"
            >
              Add Resident
            </button>


          </form>

        </div>



        <div className="list-card">

          <h2>
            Resident List
          </h2>


          {residents.length === 0 ? (

            <div className="empty-state">

              <p>
                No residents added yet.
              </p>

            </div>

          ) : (

            <div className="resident-list">


              {residents.map((resident) => (

                <div
                  className="resident-item"
                  key={resident.id}
                >


                  <div>

                    <h3>
                      {resident.name}
                    </h3>


                    <p>
                      Apartment: {resident.apartment}
                    </p>


                    <p>
                      Phone: {resident.phone}
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