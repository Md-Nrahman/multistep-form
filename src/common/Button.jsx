import { PropTypes } from "prop-types";
import React from "react";

function Button({ onClick, title = "Button", className = "" }) {
  return (
    <button className={`button ${className}`} type="button" onClick={onClick}>
      {title}
    </button>
  );
}

export default Button;

Button.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string,
  className: PropTypes.string,
};

Button.defaultProps = {
  onClick: () => {},
  title: "Button",
  className: "",
};
