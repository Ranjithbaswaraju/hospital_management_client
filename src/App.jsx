import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";

import LoginPage from "./components/AuthComponents/loginComponent";

import RegisterPage from "./components/AuthComponents/signupComponent";

import BrowseDoctors from "./components/patientComponent/pages/BrowseDoctors";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<LoginPage />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />



        {/* Patient Page */}
        <Route
          path="/patient"
          element={<BrowseDoctors />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;