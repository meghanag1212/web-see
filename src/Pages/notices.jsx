import { useState } from "react";

export default function Notices() {

  const defaultNotices = [
    {
      id: 1,
      title: "Monthly Maintenance",
      message:
        "Monthly maintenance work will be carried out this Sunday from 10:00 AM to 2:00 PM. Residents are requested to cooperate.",
      date: "08 October 2026"
    },

    {
      id: 2,
      title: "Water Supply Update",
      message:
        "Water supply may be temporarily affected during scheduled maintenance. Please store sufficient water in advance.",
      date: "06 October 2026"
    },

    {
      id: 3,
      title: "Parking Notice",
      message:
        "Residents are requested to park their vehicles only in their designated parking spaces.",
      date: "04 October 2026"
    },

    {
      id: 4,
      title: "Community Meeting",
      message:
        "A community meeting will be held in the clubhouse this Saturday at 5:00 PM. All residents are welcome.",
      date: "02 October 2026"
    }
  ];


  const [noticeList, setNoticeList] = useState(() => {

    const savedNotices =
      localStorage.getItem("notices");

    return savedNotices
      ? JSON.parse(savedNotices)
      : defaultNotices;

  });


  const [title, setTitle] = useState("");

  const [message, setMessage] = useState("");


  function addNotice(e) {

    e.preventDefault();


    if (!title || !message) {

      alert(
        "Please enter the notice title and message."
      );

      return;
    }


    const newNotice = {

      id: Date.now(),

      title: title,

      message: message,

      date: new Date().toLocaleDateString("en-IN")

    };


    const updatedNotices = [

      newNotice,

      ...noticeList

    ];


    setNoticeList(updatedNotices);


    localStorage.setItem(
      "notices",
      JSON.stringify(updatedNotices)
    );


    setTitle("");

    setMessage("");

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
          Stay updated with important community
          announcements and information.
        </p>

      </div>



      <div className="management-grid">


        {/* CREATE NOTICE */}

        <div className="form-card">

          <h2>
            Create Notice
          </h2>


          <form onSubmit={addNotice}>


            <div className="input-group">

              <label>
                Notice Title
              </label>


              <input
                type="text"
                placeholder="Enter notice title"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
              />

            </div>



            <div className="input-group">

              <label>
                Notice Message
              </label>


              <textarea
                rows="6"
                placeholder="Write the announcement..."
                value={message}
                onChange={(e) =>
                  setMessage(e.target.value)
                }
              ></textarea>

            </div>



            <button
              type="submit"
              className="submit-button"
            >
              Publish Notice
            </button>


          </form>

        </div>



        {/* NOTICE LIST */}

        <div className="list-card">

          <h2>
            Community Notices
          </h2>


          <div className="notice-list">


            {noticeList.map((notice) => (

              <div
                className="notice-card"
                key={notice.id}
              >


                <p className="notice-date">
                  {notice.date}
                </p>


                <h3>
                  {notice.title}
                </h3>


                <p>
                  {notice.message}
                </p>


              </div>

            ))}


          </div>

        </div>


      </div>


    </main>

  );

}