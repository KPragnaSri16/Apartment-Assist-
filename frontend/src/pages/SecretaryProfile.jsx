import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

function SecretaryProfile() {

  const navigate = useNavigate();

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

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

          <li onClick={() => navigate("/view-suggestions")}>
            💡 View Suggestions
          </li>

          <li onClick={() => navigate("/manage-reminders")}>
            💰 Manage Reminders
          </li>

          <li onClick={() => navigate("/manage-emergency")}>
            📞 Emergency Contacts
          </li>

          <li className="active-menu">
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

          <h1>Secretary Profile 👤</h1>

          <p>
            Manage your profile information.
          </p>

        </div>

        <div className="section-card">

          <h2>Profile Details</h2>

          <p>
            <strong>Name:</strong>{" "}
            {user?.name}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {user?.email}
          </p>

          <p>
            <strong>Phone:</strong>{" "}
            {user?.phone}
          </p>

          <p>
            <strong>Apartment:</strong>{" "}
            {user?.apartmentName}
          </p>

          <p>
            <strong>Role:</strong>{" "}
            {user?.role}
          </p>

        </div>

      </div>

    </div>
  );
}

export default SecretaryProfile;