import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function AddEvent() {

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const [events, setEvents] = useState([
    {
      title: "Independence Day Celebration",
      date: "2026-08-15"
    }
  ]);

  const handleAddEvent = async () => {

    if (
      title.trim() === "" ||
      date.trim() === "" ||
      description.trim() === ""
    ) {

      setMessage("❌ Please fill all fields");
      return;

    }

    try {

      const response = await fetch(
        "http://localhost:5000/api/events/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            date,
            description,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {

        setMessage(`❌ ${data.message}`);
        return;

      }

      setEvents([
        {
          title,
          date,
        },
        ...events,
      ]);

      setTitle("");
      setDate("");
      setDescription("");

      setMessage("✅ Event Added Successfully");

    } catch (error) {

      console.log(error);

      setMessage("❌ Server Error");

    }

  };

  return (
    <div className="dashboard-container">

      <div className="sidebar">

        <h2>Apartment Assist</h2>

        <ul>

          <li onClick={() => navigate("/secretary")}>
            🏠 Dashboard
          </li>

          <li className="active-menu">
            ➕ Add Event
          </li>

          <li onClick={() => navigate("/manage-events")}>
            📅 Manage Events
          </li>

          <li onClick={() => navigate("/manage-complaints")}>
            📝 Manage Complaints
          </li>

          <li onClick={() => navigate("/view-suggestions")}>
            💡 View Suggestions
          </li>

          <li onClick={() => navigate("/manage-reminders")}>
            💰 Manage Reminders
          </li>

          <li onClick={() => navigate("/secretary-profile")}>
            👤 Profile
          </li>

          <li
            className="logout-btn"
            onClick={() => {
              localStorage.removeItem("user");
              navigate("/");
            }}
          >
            🚪 Logout
          </li>

        </ul>

      </div>

      <div className="main-content">

        <div className="welcome-card">

          <h1>Add New Event ➕</h1>

          <p>
            Create and publish apartment events.
          </p>

          {message && (
            <div className="success-message">
              {message}
            </div>
          )}

        </div>

        <div className="section-card">

          <input
            type="text"
            placeholder="Event Title"
            className="form-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <br /><br />

          <input
            type="date"
            className="form-input"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <br /><br />

          <textarea
            placeholder="Event Description"
            className="form-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <br /><br />

          <button
            className="submit-btn"
            onClick={handleAddEvent}
          >
            Add Event
          </button>

        </div>

        <div className="section-card">

          <h2>Created Events</h2>

          <ul>

            {events.map((event, index) => (

              <li key={index}>
                {event.title} - {event.date}
              </li>

            ))}

          </ul>

        </div>

      </div>

    </div>
  );
}

export default AddEvent;