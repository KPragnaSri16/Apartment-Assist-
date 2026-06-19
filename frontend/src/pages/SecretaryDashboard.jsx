import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function SecretaryDashboard() {

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

      const response = await fetch(
        "http://localhost:5000/api/complaints"
      );

      const data = await response.json();

      setComplaints(data);

    } catch (error) {

      console.log(error);

    }

  };

  const fetchSuggestions = async () => {

    try {

      const response = await fetch(
        "http://localhost:5000/api/suggestions"
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

          <li onClick={() => navigate("/add-event")}>
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
 
          <li onClick={() => navigate("/manage-emergency")}>
            📞 Emergency Contacts
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

          <h1>Welcome, Secretary 👋</h1>

          <p>
            Manage apartment activities, events,
            complaints and community updates.
          </p>

        </div>

        <div className="cards-container">

          <div className="info-card">
            <h2>📅 Events</h2>
            <p>{events.length} Active Events</p>
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

      </div>

    </div>
  );
}

export default SecretaryDashboard;