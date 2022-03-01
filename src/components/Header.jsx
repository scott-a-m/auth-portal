import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ setUserData, userData }) => {
  const navigate = useNavigate();

  const logoutUser = async () => {
    await axios.delete("/api/v1/auth/logout");
    setUserData(null);
    navigate("/");
  };
  return (
    <div>
      <ul className="flex justify-end">
        {userData ? (
          <li>
            <button
              className="p-2 m-4 bg-red-500 text-white rounded-lg hover:animate-pulse"
              onClick={logoutUser}
            >
              Logout
            </button>
          </li>
        ) : (
          <li>
            <Link to="/login">
              <button className="p-2 m-4 bg-green-500 text-white hover:animate-pulse rounded-lg">
                Login
              </button>
            </Link>
          </li>
        )}
        <li>
          <Link to="/">
            <button className="p-2 m-4 bg-yellow-500 text-white rounded-lg hover:animate-pulse">
              Home
            </button>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
