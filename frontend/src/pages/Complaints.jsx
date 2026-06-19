import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Complaints() {

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetchComplaints();
  }, []);

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

      setMessage("❌ Failed to load complaints");

    }

  };

  const handleSubmit = async () => {

    if (
      title.trim() === "" ||
      description.trim() === ""
    ) {

      setMessage("❌ Please fill all fields");
      return;

    }

    try {

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const response = await fetch(
        "http://localhost:5000/api/complaints/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            userId: user._id,
            tenantName: user.name,
            flatNumber: user.flatNumber,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {

        setMessage(`❌ ${data.message}`);
        return;

      }

      setTitle("");
      setDescription("");

      setMessage(
        "✅ Complaint Submitted Successfully"
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

          <li onClick={() => navigate("/tenant")}>
            🏠 Dashboard
          </li>

          <li onClick={() => navigate("/events")}>
            📅 Events
          </li>

          <li className="active-menu">
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

          <h1>Raise Complaint 📝</h1>

          <p>
            Submit issues regarding apartment facilities.
          </p>

          {message && (
            <div className="success-message">
              {message}
            </div>
          )}

        </div>

        <div className="section-card">

          <input
            type="text"
            placeholder="Complaint Title"
            className="form-input"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          <br /><br />

          <textarea
            placeholder="Describe your complaint"
            className="form-textarea"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
          ></textarea>

          <br /><br />

          <button
            className="submit-btn"
            onClick={handleSubmit}
          >
            Submit Complaint
          </button>

        </div>

        <div className="section-card">

          <h2>My Complaints</h2>

          <ul>

            {complaints.map((complaint) => (

              <li key={complaint._id}>

                <strong>
                  {complaint.title}
                </strong>

                {" - "}

                {complaint.status}

              </li>

            ))}

          </ul>

        </div>

      </div>

    </div>
  );
}

export default Complaints;