import "../Login.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {

    try {

      const response = await fetch(
        "http://localhost:5000/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {

        setMessage(`❌ ${data.message}`);

        return;
      }

      setMessage("✅ Login Successful");

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      setTimeout(() => {

        if (data.user.role === "tenant") {

          navigate("/tenant");

        } else if (
          data.user.role === "secretary"
        ) {

          navigate("/secretary");

        }

      }, 1000);

    } catch (error) {

      setMessage("❌ Server Error");

      console.log(error);

    }

  };

  return (
    <div className="login-container">

      <div className="left-panel">

        <h1>Apartment Assist</h1>

        <p className="tagline">
          Smart Living Starts Here
        </p>

        <p className="description">
          Manage apartment events,
          complaints, announcements and
          community activities seamlessly
          with a modern digital platform.
        </p>

      </div>

      <div className="right-panel">

        <div className="login-box">

          <h2>Welcome Back</h2>

          <p className="login-subtitle">
            Login to continue
          </p>

          {message && (

            <div className="success-message">
              {message}
            </div>

          )}

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button
            className="tenant-btn"
            onClick={handleLogin}
          >
            Login
          </button>

          <p className="signup-text">

            New Tenant?{" "}

            <span
              className="tenant-signup"
              onClick={() =>
                navigate(
                  "/tenant-signup"
                )
              }
            >
              Sign Up
            </span>

          </p>

          <p className="signup-text">

            New Secretary?{" "}

            <span
              className="secretary-signup"
              onClick={() =>
                navigate(
                  "/secretary-signup"
                )
              }
            >
              Sign Up
            </span>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;