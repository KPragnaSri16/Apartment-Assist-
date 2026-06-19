import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

function Profile() {

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

          <li onClick={() => navigate("/emergency")}>
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

          <h1>My Profile 👤</h1>

          <p>
            View your apartment resident details.
          </p>

        </div>

        <div className="section-card">

          <h2>Resident Information</h2>

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
            <strong>Flat Number:</strong>{" "}
            {user?.flatNumber}
          </p>

          <p>
            <strong>Members:</strong>{" "}
            {user?.members}
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

export default Profile;