import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyEmail from "./pages/VerifyEmail";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Header from "./components/Header";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const [userData, setUserData] = useState(null);

  const getUser = async () => {
    try {
      const { data } = await axios.get(`/api/v1/users/showMe`);
      setUserData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <BrowserRouter>
      <Header userData={userData} setUserData={setUserData} />
      <Routes>
        <Route path="/" element={<Home userData={userData} />} exact />
        <Route
          path="/user/verify-email"
          element={<VerifyEmail userData={userData} />}
          exact
        />
        <Route
          path="/login"
          element={<Login getUser={getUser} userData={userData} />}
          exact
        />
        <Route
          path="/register"
          element={<Register userData={userData} />}
          exact
        />
        <Route
          path="/dashboard"
          element={<Dashboard userData={userData} />}
          exact
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
