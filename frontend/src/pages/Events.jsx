import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Events() {

  const navigate = useNavigate();

  const [events, setEvents] = useState([]);

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

    }

  };

  return (
    <div className="dashboard-container">

      <div className="sidebar">

        <h2>Apartment Assist</h2>

        <ul>

          <li onClick={() => navigate("/tenant")}>
            🏠 Dashboard
          </li>

          <li className="active-menu">
            📅 Events
          </li>

          <li onClick={() => navigate("/complaints")}>
            📝 Complaints
          </li>

          <li onClick={() => navigate("/suggestions")}>
            💡 Suggestions
          </li>

          <li onClick={() => navigate("/reminders")}>
            💰 Reminders
          </li>

          <li onClick={() => navigate("/emergency")}>
            📞 Emergency Contacts
          </li>

          <li onClick={() => navigate("/profile")}>
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

          <h1>Community Events 📅</h1>

          <p>
            Participate in apartment activities and stay
            connected with your community.
          </p>

        </div>

        <div className="cards-container">

          {events.map((event) => (

            <div
              className="info-card"
              key={event._id}
            >

              <h2>{event.title}</h2>

              <p>
                <strong>Date:</strong> {event.date}
              </p>

              <p>{event.description}</p>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Events;