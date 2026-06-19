import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function ViewSuggestions() {

  const navigate = useNavigate();

  const [suggestions, setSuggestions] =
    useState([]);

  useEffect(() => {
    fetchSuggestions();
  }, []);

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

          <li onClick={() => navigate("/manage-events")}>
            📅 Manage Events
          </li>

          <li onClick={() => navigate("/manage-complaints")}>
            📝 Manage Complaints
          </li>

          <li className="active-menu">
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

          <h1>Resident Suggestions 💡</h1>

          <p>
            Review suggestions submitted by apartment residents.
          </p>

        </div>

        {suggestions.map((suggestion) => (

          <div
            className="section-card"
            key={suggestion._id}
          >

            <h2>
              {suggestion.title}
            </h2>

            <p>
              <strong>Tenant:</strong>{" "}
              {suggestion.tenantName}
            </p>

            <p>
              <strong>Flat No:</strong>{" "}
              {suggestion.flatNumber}
            </p>

            <p>
              {suggestion.description}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default ViewSuggestions;