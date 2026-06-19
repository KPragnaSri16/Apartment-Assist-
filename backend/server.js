const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const suggestionRoutes = require("./routes/suggestionRoutes");
const reminderRoutes = require("./routes/reminderRoutes");
const emergencyRoutes = require("./routes/emergencyRoutes");

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/suggestions", suggestionRoutes);
app.use("/api/reminders", reminderRoutes);
app.use("/api/emergency", emergencyRoutes);

app.get("/", (req, res) => {
  res.send("Apartment Assist Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});