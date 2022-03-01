import React from "react";
import { Link } from "react-router-dom";

const Home = ({ userData }) => {
  if (userData) {
    return (
      <div>
        <h1 className="text-6xl text-center p-4">Welcome to Auth Portal</h1>
        <p className="p-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius iste
          eligendi harum amet hic ea, quibusdam ipsam repellat architecto
          accusantium, deserunt vitae delectus, est placeat illum quasi
          provident consectetur laboriosam reprehenderit at fugit aspernatur. Ea
          esse corporis assumenda reprehenderit, fugiat molestiae, deleniti
          accusantium nostrum, suscipit facere excepturi sint quis numquam.
        </p>
        <div className="text-center">
          <Link to="/dashboard">
            <button className="p-4 mx-2 bg-blue-500 rounded-lg text-white">
              Dashboard
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center">
      <h1 className="text-6xl text-center p-4">Welcome to Auth Portal</h1>
      <p className="p-4">
        Welcome to Auth Portal. A simple service which allows you to create
        email-verfied user accounts. Use as a starter for projects which use
        user authentication.
      </p>

      <div className="flex justify-center">
        <Link to="/login">
          <button className="p-4 mx-2  bg-green-600 rounded-lg text-white hover:animate-pulse">
            Login{" "}
          </button>
        </Link>
        <Link to="/register">
          <button className="p-4 mx-2 bg-blue-500 rounded-lg text-white hover:animate-pulse">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
