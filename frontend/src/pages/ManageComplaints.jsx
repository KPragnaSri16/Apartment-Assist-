import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function ManageComplaints() {

  const navigate = useNavigate();

  const [complaints, setComplaints] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {

    try {

      const response = await fetch(
        "http://localhost:5000/api/complaints"
      );

      const data = await response.json();

      setComplaints(data);

    } catch (error) {

      console.log(error);

      setMessage(
        "❌ Failed to load complaints"
      );

    }

  };

  const updateStatus = async (
    id,
    currentStatus
  ) => {

    let newStatus = currentStatus;

    if (currentStatus === "Not Started") {

      newStatus = "In Progress";

    } else if (
      currentStatus === "In Progress"
    ) {

      newStatus = "Resolved";

    }

    try {

      const response = await fetch(
        `http://localhost:5000/api/complaints/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      if (!response.ok) {

        setMessage(
          "❌ Failed to update status"
        );

        return;

      }

      setMessage(
        "✅ Complaint Status Updated"
      );

      fetchComplaints();

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

          <li onClick={() => navigate("/add-event")}>
            ➕ Add Event
          </li>

          <li onClick={() => navigate("/manage-events")}>
            📅 Manage Events
          </li>

          <li className="active-menu">
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

          <h1>Manage Complaints 📝</h1>

          <p>
            Review and update complaint status.
          </p>

          {message && (
            <div className="success-message">
              {message}
            </div>
          )}

        </div>

        {complaints.map((complaint) => (

          <div
            className="section-card"
            key={complaint._id}
          >

            <h2>{complaint.title}</h2>

            <p>
              <strong>Tenant:</strong>{" "}
              {complaint.tenantName}
            </p>

            <p>
              <strong>Flat No:</strong>{" "}
              {complaint.flatNumber}
            </p>

            <p>
              {complaint.description}
            </p>

            <p>
              Status:
              <strong>
                {" "}
                {complaint.status}
              </strong>
            </p>

            <br />

            {complaint.status !==
              "Resolved" && (

              <button
                className="submit-btn"
                onClick={() =>
                  updateStatus(
                    complaint._id,
                    complaint.status
                  )
                }
              >
                Update Status
              </button>

            )}

          </div>

        ))}

      </div>

    </div>
  );
}

export default ManageComplaints;