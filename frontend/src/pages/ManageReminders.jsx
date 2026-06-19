import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function ManageReminders() {

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

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

      setMessage("❌ Failed to load reminders");

    }

  };

  const handleAddReminder = async () => {

    if (
      title.trim() === "" ||
      date.trim() === ""
    ) {

      setMessage("❌ Please fill all fields");
      return;

    }

    try {

      const response = await fetch(
        "http://localhost:5000/api/reminders/add",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            title,
            date,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {

        setMessage(`❌ ${data.message}`);
        return;

      }

      setTitle("");
      setDate("");

      setMessage(
        "✅ Reminder Added Successfully"
      );

      fetchReminders();

    } catch (error) {

      console.log(error);

      setMessage("❌ Server Error");

    }

  };

  const deleteReminder = async (
    id
  ) => {

    try {

      const response = await fetch(
        `http://localhost:5000/api/reminders/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {

        setMessage(
          "❌ Failed to delete reminder"
        );

        return;

      }

      setMessage(
        "✅ Reminder Deleted Successfully"
      );

      fetchReminders();

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

          <li onClick={() => navigate("/manage-complaints")}>
            📝 Manage Complaints
          </li>

          <li onClick={() => navigate("/view-suggestions")}>
            💡 View Suggestions
          </li>

          <li className="active-menu">
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

          <h1>Manage Reminders 💰</h1>

          <p>
            Create and manage apartment reminders.
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
            placeholder="Reminder Title"
            className="form-input"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          <br /><br />

          <input
            type="date"
            className="form-input"
            value={date}
            onChange={(e) =>
              setDate(e.target.value)
            }
          />

          <br /><br />

          <button
            className="submit-btn"
            onClick={handleAddReminder}
          >
            Add Reminder
          </button>

        </div>

        <div className="section-card">

          <h2>Active Reminders</h2>

          <ul>

            {reminders.map(
              (reminder) => (

                <li
                  key={reminder._id}
                >

                  <strong>
                    {reminder.title}
                  </strong>

                  {" - "}

                  {reminder.date}

                  <button
                    className="submit-btn"
                    style={{
                      marginLeft:
                        "15px",
                      padding:
                        "6px 12px",
                    }}
                    onClick={() =>
                      deleteReminder(
                        reminder._id
                      )
                    }
                  >
                    Delete
                  </button>

                </li>

              )
            )}

          </ul>

        </div>

      </div>

    </div>
  );
}

export default ManageReminders;