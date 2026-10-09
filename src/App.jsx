
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import NAV from "./Components/NAV";
import ProtectedRoute from "./Components/ProtectedRoute";

import HOME from "./Pages/HOME";
import SIGNUP from "./Pages/SIGNUP";
import LOGIN from "./Pages/LOGIN";
import Residents from "./Pages/Residents";
import Maintenance from "./Pages/Maintenance";
import Notices from "./Pages/notices";
import Facilities from "./Pages/Facilities";

export default function App() {
  return (
    <BrowserRouter>
      <NAV />

      <Routes>
        {/* Public pages */}
        <Route
          path="/signup"
          element={<SIGNUP />}
        />

        <Route
          path="/login"
          element={<LOGIN />}
        />

        {/* Protected pages */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HOME />
            </ProtectedRoute>
          }
        />

        <Route
          path="/residents"
          element={
            <ProtectedRoute>
              <Residents />
            </ProtectedRoute>
          }
        />

        <Route
          path="/maintenance"
          element={
            <ProtectedRoute>
              <Maintenance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notices"
          element={
            <ProtectedRoute>
              <Notices />
            </ProtectedRoute>
          }
        />

        <Route
          path="/facilities"
          element={
            <ProtectedRoute>
              <Facilities />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
