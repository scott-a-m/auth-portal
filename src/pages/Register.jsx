import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormRow from "../components/FormRow";
import { useEffect } from "react";

const Register = ({ userData }) => {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [btnStatus, setbtnStatus] = useState({
    text: "Register",
    disabled: false,
  });

  const [message, showMessage] = useState(null);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    setbtnStatus((btnData) => ({
      ...btnData,
      text: "Processing",
      disabled: true,
    }));

    try {
      await axios.post(`/api/v1/auth/register`, registerData);
      setbtnStatus((btnData) => ({
        ...btnData,
        text: "Registered",
        disabled: true,
      }));
      setRegisterData(() => ({
        name: "",
        email: "",
        password: "",
      }));
      showMessage(() => (
        <div className="bg-green-500 w-96 text-center rounded-sm text-white">
          {" "}
          Success: Please verify your account via the link sent to your email
        </div>
      ));
    } catch (err) {
      setbtnStatus((btnData) => ({
        text: "Register",
        disabled: false,
      }));
      showMessage(() => (
        <div className="bg-red-500 w-96 text-center rounded-sm text-white">
          {" "}
          Error: Please try again
        </div>
      ));
      setRegisterData(() => ({
        name: "",
        email: "",
        password: "",
      }));

      console.log("error has occured");
      console.log(err.message);
    }
  };

  const handleChange = (e) => {
    setRegisterData((regData) => ({
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
    <div>
      <h1 className="text-6xl text-center p-4">Register</h1>
      {message && (
        <div className="flex justify-center">
          <div className="bg-green-500 w-96 text-center rounded-sm text-white">
            {message}
          </div>
        </div>
      )}
      <form
        className="text-center bg-blue-600 mx-auto my-4 max-w-md p-8 rounded shadow-sm"
        onSubmit={handleRegister}
      >
        <FormRow
          name="name"
          type="name"
          value={registerData.name}
          onChangeFunc={handleChange}
        />
        <FormRow
          name="email"
          type="email"
          value={registerData.email}
          onChangeFunc={handleChange}
        />
        <FormRow
          name="password"
          type="password"
          value={registerData.password}
          onChangeFunc={handleChange}
        />
        <div>
          <button
            className="p-2 mt-4 bg-blue-100 rounded-lg hover:bg-white disabled:opacity-50"
            disabled={btnStatus.disabled}
          >
            {btnStatus.text}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
