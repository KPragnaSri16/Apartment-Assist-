import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function ManageEmergencyContacts() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

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

  const addContact = async () => {

    if (
      name.trim() === "" ||
      phone.trim() === ""
    ) {
      return;
    }

    try {

      const response = await fetch(
        "http://localhost:5000/api/emergency/add",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            name,
            phone,
          }),
        }
      );

      if (!response.ok) {
        return;
      }

      setName("");
      setPhone("");

      fetchContacts();

    } catch (error) {

      console.log(error);

    }

  };

  const deleteContact = async (
    id
  ) => {

    try {

      const response = await fetch(
        `http://localhost:5000/api/emergency/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        return;
      }

      fetchContacts();

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

          <li onClick={() => navigate("/view-suggestions")}>
            💡 View Suggestions
          </li>

          <li onClick={() => navigate("/manage-reminders")}>
            💰 Manage Reminders
          </li>

          <li className="active-menu">
            📞 Emergency Contacts
          </li>

          <li onClick={() => navigate("/secretary-profile")}>
            👤 Profile
          </li>

        </ul>

      </div>

      <div className="main-content">

        <div className="welcome-card">

          <h1>
            Manage Emergency Contacts 📞
          </h1>

          <p>
            Add and manage emergency
            contact information.
          </p>

        </div>

        <div className="section-card">

          <input
            type="text"
            placeholder="Contact Name"
            className="form-input"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <br /><br />

          <input
            type="text"
            placeholder="Phone Number"
            className="form-input"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
          />

          <br /><br />

          <button
            className="submit-btn"
            onClick={addContact}
          >
            Add Contact
          </button>

        </div>

        <div className="section-card">

          <h2>
            Emergency Contacts
          </h2>

          <ul>

            {contacts.map(
              (contact) => (

                <li
                  key={contact._id}
                >

                  <strong>
                    {contact.name}
                  </strong>

                  {" - "}

                  {contact.phone}

                  <button
                    className="submit-btn"
                    style={{
                      marginLeft:
                        "15px",
                      padding:
                        "6px 12px",
                    }}
                    onClick={() =>
                      deleteContact(
                        contact._id
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

export default ManageEmergencyContacts;