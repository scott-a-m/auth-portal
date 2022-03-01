import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const VerifyEmail = ({ userData }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const query = new URLSearchParams(useLocation().search);

  const navigate = useNavigate();

  const verifyUserToken = async () => {
    setLoading(true);
    try {
      console.log(query.get("token"), query.get("email"));
      await axios.post("/api/v1/auth/verify-email", {
        verificationToken: query.get("token"),
        email: query.get("email"),
      });
    } catch (error) {
      console.log(error);
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!userData) {
      return verifyUserToken();
    }
    navigate("/dashboard");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="text-center rounded-md p-4 max-w-md bg-blue-500 text-white m-auto">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center rounded-md p-4 max-w-md bg-blue-500 text-white m-auto">
        <p className="text-xl">Ooops, an error occured, please try again.</p>
      </div>
    );
  }

  return (
    <div className="text-center rounded-md p-4 max-w-md bg-blue-500 text-white m-auto">
      <p className="text-xl">Account Verified!</p>
      <Link to="/login" className="text-md">
        Please login
      </Link>
    </div>
  );
};

export default VerifyEmail;
