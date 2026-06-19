import "../Signup.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SecretarySignup() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [apartmentName, setApartmentName] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async () => {

    if (password !== confirmPassword) {
      setMessage("❌ Passwords do not match");
      return;
    }

    try {

      const response = await fetch(
        "http://localhost:5000/api/users/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            phone,
            apartmentName,
            accessCode,
            password,
            role: "secretary",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(`❌ ${data.message}`);
        return;
      }

      setMessage(
        "✅ Secretary Registration Successful! Redirecting to Login..."
      );

      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (error) {
      console.log(error);
      setMessage("❌ Server Error");
    }
  };

  return (
    <div className="signup-container">

      <div className="signup-left">

        <h1>Secretary Registration</h1>

        <p className="signup-tagline">
          Manage Your Apartment Digitally
        </p>

        <p className="signup-description">
          Register as a secretary to manage
          complaints, announcements, apartment
          events, notices and tenant operations
          efficiently.
        </p>

      </div>

      <div className="signup-right">

        <div className="signup-box">

          <h2>Create Account</h2>

          {message && (
            <div className="success-message">
              {message}
            </div>
          )}

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            type="text"
            placeholder="Apartment Name"
            value={apartmentName}
            onChange={(e) => setApartmentName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Secretary Access Code"
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            className="secretary-signup-btn"
            onClick={handleSignup}
          >
            Register as Secretary
          </button>

        </div>

      </div>

    </div>
  );
}

export default SecretarySignup;