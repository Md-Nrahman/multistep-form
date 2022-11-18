import { PropTypes } from "prop-types";
import React from "react";

function Input({
  onChange,
  value = "",
  type = "text",
  placeholder = "Input",
  label = "",
  error = "",
  disabled = false,
  reset,
  resetStatus = false,
}) {
  return (
    <div className="fWidth">
      <h5 className="label">{label}</h5>
      <input
        disabled={disabled}
        className="fInput"
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        accept={type === "file" ? "image/png, image/gif, image/jpeg" : ""}
      />
      <h6 className="error">{error}</h6>
      {resetStatus && value && (
        <button type="button" onClick={() => reset()}>
          Reset
        </button>
      )}
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
  disabled: PropTypes.bool,
  reset: PropTypes.func,
  resetStatus: PropTypes.bool,
};

Input.defaultProps = {
  onChange: () => {},
  placeholder: "Input",
  type: "text",
  value: "",
  error: "",
  disabled: false,
  reset: () => {},
  resetStatus: false,
};
