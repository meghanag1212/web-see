import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import NAV from "./Components/NAV";

import HOME from "./Pages/HOME";
import Notices from "./Pages/notices";
import Residents from "./Pages/Residents";
import Maintenance from "./Pages/Maintenance";
import Facilities from "./Pages/Facilities";
import LOGIN from "./Pages/LOGIN";
import SIGNUP from "./Pages/SIGNUP";


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
          path="/login"
          element={<LOGIN />}
        />


        <Route
          path="/signup"
          element={<SIGNUP />}
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