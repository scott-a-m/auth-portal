import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import FormRow from "../components/FormRow";

const ResetPassword = () => {
  const query = new URLSearchParams(useLocation().search);

  const [newPassword, setNewPassword] = useState("");

  const [btnStatus, setbtnStatus] = useState({
    text: "Submit",
    disabled: false,
  });

  const newPasswordData = {
    password: newPassword,
    token: query.get("token"),
    email: query.get("email"),
  };

  const [message, showMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setbtnStatus((btnData) => ({
      ...btnData,
      text: "Processing",
      disabled: true,
    }));
    try {
      await axios.post(`/api/v1/auth/reset-password`, newPasswordData);
      setbtnStatus((btnData) => ({
        ...btnData,
        text: "Updated",
        disabled: true,
      }));
      setNewPassword("");
      showMessage(() => (
        <div className="bg-green-500 w-96 text-center rounded-sm text-white">
          {" "}
          Success: Please Login.
        </div>
      ));
    } catch (err) {
      showMessage(() => (
        <div className="bg-red-500 w-96 text-center rounded-sm text-white">
          {" "}
          Error: Please try again
        </div>
      ));
      setbtnStatus((btnData) => ({
        text: "Submit",
        disabled: false,
      }));
      setNewPassword("");
      console.log("error has occured");
      console.log(err.message);
    }
  };

  const handleChange = (e) => {
    setNewPassword(e.target.value);
  };

  return (
    <div className="text-center">
      <h1 className="text-6xl text-center p-4">Reset Password</h1>
      {message && (
        <div className="flex justify-center">
          <div className="bg-green-500 w-96 text-center rounded-sm text-white">
            {message}
          </div>
        </div>
      )}
      <form
        className="text-center bg-blue-600 mx-auto my-4 max-w-md p-4 rounded shadow-sm md:p-8"
        onSubmit={handleSubmit}
      >
        <FormRow
          name="password"
          type="password"
          value={newPassword}
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

export default ResetPassword;
