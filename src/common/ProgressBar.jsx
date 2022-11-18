import { PropTypes } from "prop-types";
import React from "react";

function ProgressBar({ count }) {
  return <progress id="progress" value={(count / 4) * 100} max="100" />;
}

export default ProgressBar;

ProgressBar.propTypes = {
  count: PropTypes.number,
};

ProgressBar.defaultProps = {
  count: 0,
};
