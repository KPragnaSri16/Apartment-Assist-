import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function ManageEvents() {

  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {

    try {

      const response = await fetch(
        "http://localhost:5000/api/events"
      );

      const data = await response.json();

      setEvents(data);

    } catch (error) {

      console.log(error);

      setMessage(
        "❌ Failed to load events"
      );

    }

  };

  const deleteEvent = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this event?"
      );

    if (!confirmDelete) return;

    try {

      const response = await fetch(
        `http://localhost:5000/api/events/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {

        setMessage(
          `❌ ${data.message}`
        );

        return;

      }

      setEvents(
        events.filter(
          (event) =>
            event._id !== id
        )
      );

      setMessage(
        "✅ Event Deleted Successfully"
      );

    } catch (error) {

      console.log(error);

      setMessage(
        "❌ Server Error"
      );

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

          <li onClick={() => navigate("/add-event")}>
            ➕ Add Event
          </li>

          <li className="active-menu">
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

          <h1>Manage Events 📅</h1>

          <p>
            View and manage apartment events.
          </p>

          {message && (
            <div className="success-message">
              {message}
            </div>
          )}

        </div>

        {events.map((event) => (

          <div
            className="section-card"
            key={event._id}
          >

            <h2>{event.title}</h2>

            <p>
              <strong>Date:</strong>{" "}
              {event.date}
            </p>

            <p>
              {event.description}
            </p>

            <br />

            <button
              className="submit-btn"
              onClick={() =>
                deleteEvent(
                  event._id
                )
              }
            >
              Delete Event
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default ManageEvents;