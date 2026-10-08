import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function Notices() {

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const [notices, setNotices] = useState([]);

  useEffect(() => {
    fetchNotices();
  }, []);

  async function fetchNotices() {

    const { data, error } = await supabase
      .from("notices")
      .select("*")
      .order("id", {
        ascending: false
      });

    if (error) {
      console.error(error);
      alert("Unable to load notices.");
      return;
    }

    setNotices(data || []);
  }

  async function handleSubmit(e) {

    e.preventDefault();

    if (!title || !message) {
      alert("Please fill all fields.");
      return;
    }

    const { data, error } = await supabase
      .from("notices")
      .insert([
        {
          title: title,
          message: message
        }
      ])
      .select();

    if (error) {
      console.error(error);
      alert("Error: " + error.message);
      return;
    }

    setNotices([
      ...data,
      ...notices
    ]);

    setTitle("");
    setMessage("");

    alert(
      "Notice added successfully!"
    );
  }

  return (
    <main className="management-page">

      <div className="page-heading">

        <p className="section-label">
          COMMUNITY UPDATES
        </p>

        <h1>
          Notices
        </h1>

        <p>
          Create and view important
          apartment announcements.
        </p>

      </div>

      <div className="management-grid">

        <div className="form-card">

          <h2>
            Add Notice
          </h2>

          <form
            onSubmit={handleSubmit}
            className="management-form"
          >

            <div className="input-group">

              <label>
                Notice Title
              </label>

              <input
                type="text"
                placeholder="Enter notice title"
                value={title}
                onChange={(e) =>
                  setTitle(
                    e.target.value
                  )
                }
              />

            </div>

            <div className="input-group">

              <label>
                Notice Message
              </label>

              <textarea
                rows="6"
                placeholder="Enter notice message"
                value={message}
                onChange={(e) =>
                  setMessage(
                    e.target.value
                  )
                }
              />

            </div>

            <button type="submit">
              Add Notice
            </button>

          </form>

        </div>

        <div className="list-card">

          <h2>
            Community Notices
          </h2>

          {notices.length === 0 ? (

            <p>
              No notices available.
            </p>

          ) : (

            notices.map((notice) => (

              <div
                className="data-card"
                key={notice.id}
              >

                <h3>
                  {notice.title}
                </h3>

                <p>
                  {notice.message}
                </p>

              </div>

            ))

          )}

        </div>

      </div>

    </main>
  );
}