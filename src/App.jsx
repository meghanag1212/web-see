import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import NAV from "./Components/NAV";

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

        <Route
          path="/"
          element={<HOME />}
        />

        <Route
          path="/signup"
          element={<SIGNUP />}
        />

        <Route
          path="/login"
          element={<LOGIN />}
        />

        <Route
          path="/residents"
          element={<Residents />}
        />

        <Route
          path="/maintenance"
          element={<Maintenance />}
        />

        <Route
          path="/notices"
          element={<Notices />}
        />

        <Route
          path="/facilities"
          element={<Facilities />}
        />

      </Routes>

    </BrowserRouter>
  );
}