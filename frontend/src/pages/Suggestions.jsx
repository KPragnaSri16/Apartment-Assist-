import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Suggestions() {

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const fetchSuggestions = async () => {

    try {

      const response = await fetch(
        `http://localhost:5000/api/suggestions/user/${user._id}`
      );

      const data = await response.json();

      setSuggestions(data);

    } catch (error) {

      console.log(error);

      setMessage("❌ Failed to load suggestions");

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

      const response = await fetch(
        "http://localhost:5000/api/suggestions/add",
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
        "✅ Suggestion Submitted Successfully"
      );

      fetchSuggestions();

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

          <li onClick={() => navigate("/complaints")}>
            📝 Complaints
          </li>

          <li className="active-menu">
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

          <h1>Share Suggestions 💡</h1>

          <p>
            Help improve the apartment community by sharing your ideas.
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
            placeholder="Suggestion Title"
            className="form-input"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          <br /><br />

          <textarea
            placeholder="Describe your suggestion"
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
            Submit Suggestion
          </button>

        </div>

        <div className="section-card">

          <h2>My Suggestions</h2>

          <ul>

            {suggestions.map(
              (suggestion) => (

                <li key={suggestion._id}>

                  <strong>
                    {suggestion.title}
                  </strong>

                  {" - "}

                  {suggestion.description}

                </li>

              )
            )}

          </ul>

        </div>

      </div>

    </div>
  );
}

export default Suggestions;