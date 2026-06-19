import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function TenantDashboard() {

  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [reminders, setReminders] = useState([]);

  useEffect(() => {

    fetchEvents();
    fetchComplaints();
    fetchSuggestions();
    fetchReminders();

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

  const fetchComplaints = async () => {

    try {

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const response = await fetch(
        `http://localhost:5000/api/complaints/user/${user._id}`
      );

      const data = await response.json();

      setComplaints(data);

    } catch (error) {

      console.log(error);

    }

  };

  const fetchSuggestions = async () => {

    try {

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const response = await fetch(
        `http://localhost:5000/api/suggestions/user/${user._id}`
      );

      const data = await response.json();

      setSuggestions(data);

    } catch (error) {

      console.log(error);

    }

  };

  const fetchReminders = async () => {

    try {

      const response = await fetch(
        "http://localhost:5000/api/reminders"
      );

      const data = await response.json();

      setReminders(data);

    } catch (error) {

      console.log(error);

    }

  };

  return (
    <div className="dashboard-container">

      <div className="sidebar">

        <h2>Apartment Assist</h2>

        <ul>

          <li className="active-menu">
            🏠 Dashboard
          </li>

          <li onClick={() => navigate("/events")}>
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

          <h1>Welcome, Tenant 👋</h1>

          <p>
            Stay updated with apartment events,
            complaints, reminders and community activities.
          </p>

        </div>

        <div className="cards-container">

          <div className="info-card">
            <h2>📅 Events</h2>
            <p>{events.length} Upcoming Events</p>
          </div>

          <div className="info-card">
            <h2>📝 Complaints</h2>
            <p>{complaints.length} Complaints</p>
          </div>

          <div className="info-card">
            <h2>💡 Suggestions</h2>
            <p>{suggestions.length} Suggestions</p>
          </div>

          <div className="info-card">
            <h2>💰 Reminders</h2>
            <p>{reminders.length} Active Reminders</p>
          </div>

        </div>

        <div className="section-card">

          <h2>📅 Upcoming Events</h2>

          <ul>

            {events.map((event) => (

              <li key={event._id}>
                {event.title} - {event.date}
              </li>

            ))}

          </ul>

        </div>

      </div>

    </div>
  );
}

export default TenantDashboard;