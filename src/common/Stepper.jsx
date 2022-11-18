import { PropTypes } from "prop-types";
import React from "react";

function Stepper({ count }) {
  return (
    <div className="stepper">
      <ul className="progressBar">
        <li className="active">Account</li>
        <li className={`${count > 1 && "active"}`}>Personal</li>
        <li className={`${count > 2 && "active"}`}>Image</li>
        <li className={`${count > 3 && "active"}`}>Finish</li>
      </ul>
    </div>
  );
}

export default Stepper;

Stepper.propTypes = {
  count: PropTypes.number,
};

Stepper.defaultProps = {
  count: 0,
};
