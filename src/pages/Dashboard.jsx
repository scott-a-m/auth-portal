import React from "react";

const Dashboard = ({ userData }) => {
  if (userData) {
    return (
      <div className="text-center">
        <div className="bg-blue-600 max-w-lg m-auto rounded-md text-xl p-8">
          <h1 className="bg-white p-4 rounded-md m-4">
            {userData.user.name.toUpperCase()}
          </h1>
          <h1 className="bg-white p-4 rounded-md m-4">
            ID: {userData.user.userId}
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div>
      You do not have access to this route. Please register an account or login
      if you already have one.
    </div>
  );
};

export default Dashboard;
