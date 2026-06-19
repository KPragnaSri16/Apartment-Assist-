import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Reminders() {

  const navigate = useNavigate();

  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    fetchReminders();
  }, []);

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

          <li onClick={() => navigate("/tenant")}>
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

          <li className="active-menu">
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

          <h1>Important Reminders 💰</h1>

          <p>
            Keep track of payments, meetings and apartment activities.
          </p>

        </div>

        <div className="cards-container">

          {reminders.map((reminder) => (

            <div
              className="info-card"
              key={reminder._id}
            >

              <h2>{reminder.title}</h2>

              <p>
                Due Date: {reminder.date}
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Reminders;