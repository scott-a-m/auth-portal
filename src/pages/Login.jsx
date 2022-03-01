import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormRow from "../components/FormRow";

const Login = ({ getUser, userData }) => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [btnStatus, setbtnStatus] = useState({
    text: "Login",
    disabled: false,
  });

  const [message, showMessage] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setbtnStatus((btnData) => ({
      ...btnData,
      text: "Processing",
      disabled: true,
    }));

    try {
      await axios.post(`/api/v1/auth/login`, loginData);
      setbtnStatus((btnData) => ({
        ...btnData,
        text: "Loading",
        disabled: true,
      }));
      setLoginData(() => ({
        name: "",
        email: "",
        password: "",
      }));
      showMessage(() => (
        <div className="bg-green-500 w-96 text-center rounded-sm text-white">
          {" "}
          Success: redirecting to dashboard...
        </div>
      ));
      getUser();
    } catch (err) {
      showMessage(() => (
        <div className="bg-red-500 w-96 text-center rounded-sm text-white">
          {" "}
          Error: Please try again
        </div>
      ));
      setbtnStatus((btnData) => ({
        text: "login",
        disabled: false,
      }));
      setLoginData(() => ({
        name: "",
        email: "",
        password: "",
      }));
      console.log("error has occured");
      console.log(err.message);
    }
  };

  const handleChange = (e) => {
    setLoginData((regData) => ({
      ...regData,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (userData) {
      navigate("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  return (
    <div className="text-center">
      <h1 className="text-6xl text-center p-4">Login</h1>
      {message && (
        <div className="flex justify-center">
          <div className="bg-green-500 w-96 text-center rounded-sm text-white">
            {message}
          </div>
        </div>
      )}
      <form
        className="text-center bg-blue-600 mx-auto my-4 max-w-md p-4 rounded shadow-sm md:p-8"
        onSubmit={handleLogin}
      >
        <FormRow
          name="email"
          type="email"
          value={loginData.email}
          onChangeFunc={handleChange}
        />
        <FormRow
          name="password"
          type="password"
          value={loginData.password}
          onChangeFunc={handleChange}
        />
        <button
          className="p-2 mt-4 bg-blue-100 rounded-lg hover:bg-white disabled:opacity-50"
          disabled={btnStatus.disabled}
        >
          {btnStatus.text}
        </button>
      </form>
    </div>
  );
};

export default Login;
