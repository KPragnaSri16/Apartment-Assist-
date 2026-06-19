import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function EmergencyContacts() {

  const navigate = useNavigate();

  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {

    try {

      const response = await fetch(
        "http://localhost:5000/api/emergency"
      );

      const data = await response.json();

      setContacts(data);

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

          <li onClick={() => navigate("/reminders")}>
            💰 Reminders
          </li>

          <li className="active-menu">
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

          <h1>Emergency Contacts 📞</h1>

          <p>
            Important contacts available for residents.
          </p>

        </div>

        <div className="cards-container">

          {contacts.map((contact) => (

            <div
              className="info-card"
              key={contact._id}
            >

              <h2>{contact.name}</h2>

              <p>{contact.phone}</p>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default EmergencyContacts;