import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./pages/Login";

import TenantDashboard from "./pages/TenantDashboard";
import SecretaryDashboard from "./pages/SecretaryDashboard";

import TenantSignup from "./pages/TenantSignup";
import SecretarySignup from "./pages/SecretarySignup";

import Events from "./pages/Events";
import Complaints from "./pages/Complaints";
import Suggestions from "./pages/Suggestions";
import Reminders from "./pages/Reminders";
import EmergencyContacts from "./pages/EmergencyContacts";
import Profile from "./pages/Profile";

import AddEvent from "./pages/AddEvent";
import ManageEvents from "./pages/ManageEvents";
import ManageComplaints from "./pages/ManageComplaints";
import ViewSuggestions from "./pages/ViewSuggestions";
import ManageReminders from "./pages/ManageReminders";
import ManageEmergencyContacts from "./pages/ManageEmergencyContacts";
import SecretaryProfile from "./pages/SecretaryProfile";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Login */}

        <Route
          path="/"
          element={<Login />}
        />

        {/* Signup */}

        <Route
          path="/tenant-signup"
          element={<TenantSignup />}
        />

        <Route
          path="/secretary-signup"
          element={<SecretarySignup />}
        />

        {/* Tenant Routes */}

        <Route
          path="/tenant"
          element={<TenantDashboard />}
        />

        <Route
          path="/events"
          element={<Events />}
        />

        <Route
          path="/complaints"
          element={<Complaints />}
        />

        <Route
          path="/suggestions"
          element={<Suggestions />}
        />

        <Route
          path="/reminders"
          element={<Reminders />}
        />

        <Route
          path="/emergency"
          element={<EmergencyContacts />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        {/* Secretary Routes */}

        <Route
          path="/secretary"
          element={<SecretaryDashboard />}
        />

        <Route
          path="/add-event"
          element={<AddEvent />}
        />

        <Route
          path="/manage-events"
          element={<ManageEvents />}
        />

        <Route
          path="/manage-complaints"
          element={<ManageComplaints />}
        />

        <Route
          path="/view-suggestions"
          element={<ViewSuggestions />}
        />

        <Route
          path="/manage-reminders"
          element={<ManageReminders />}
        />

        <Route
          path="/manage-emergency"
          element={<ManageEmergencyContacts />}
        />

        <Route
          path="/secretary-profile"
          element={<SecretaryProfile />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;