import React from "react";
import { Link } from "react-router-dom";

function SuccessMessage() {
  return (
    <div>
      <p>You have successfully signed up.</p>
      <Link to="users">Click here to go to Users Tab</Link>
    </div>
  );
}

export default SuccessMessage;
