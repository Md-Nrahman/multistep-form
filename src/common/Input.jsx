import { PropTypes } from "prop-types";
import React from "react";

function Input({ onChange, value = "", type = "text", placeholder = "Input", label = "", error = "" }) {
  console.log(value);
  return (
    <div className="fWidth">
      <h5 className="label">{label}</h5>
      <input className="fInput" value={value} onChange={onChange} type={type} placeholder={placeholder} />
      <h6 className="error">{error}</h6>
    </div>
  );
}

export default Input;

Input.propTypes = {
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
};

Input.defaultProps = {
  onChange: () => {},
  placeholder: "Input",
  type: "text",
  value: "",
  error: "",
};
