import axios from "axios";
import React from "react";
import { useState } from "react";
import FormRow from "../components/FormRow";

const ForgotPassword = () => {
  const [email, setEmail] = useState({ email: "" });

  const [btnStatus, setbtnStatus] = useState({
    text: "Submit",
    disabled: false,
  });

  const [message, showMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setbtnStatus((btnData) => ({
      ...btnData,
      text: "Processing",
      disabled: true,
    }));

    try {
      await axios.post(`/api/v1/auth/forgot-password`, email);
      setbtnStatus((btnData) => ({
        ...btnData,
        text: "Submitted",
        disabled: true,
      }));
      setEmail(() => ({
        email: "",
      }));
      showMessage(() => (
        <div className="bg-green-500 w-96 text-center rounded-sm text-white">
          {" "}
          Success: Please check your email for reset password link.
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
      setEmail(() => ({
        email: "",
      }));
      console.log("error has occured");
      console.log(err.message);
    }
  };

  const handleChange = (e) => {
    setEmail((emailData) => ({
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="text-center">
      <h1 className="text-6xl text-center p-4">Forgot Password</h1>
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
          name="email"
          type="email"
          value={email.email}
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

export default ForgotPassword;
