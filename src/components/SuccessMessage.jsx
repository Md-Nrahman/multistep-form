import React from "react";
import { Link } from "react-router-dom";

function SuccessMessage() {
  return (
    <div>
      <p className="text-center text-success">You have successfully signed up.</p>
      <p className="text-center">
        <Link to="users">Click here to go to Users Tab</Link>
      </p>
    </div>
  );
}

export default SuccessMessage;
