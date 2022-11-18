import { PropTypes } from "prop-types";
import React from "react";

function ErrorBox({ error }) {
  return (
    <div>
      Please fix all the issues and try again.
      <ul>
        {Object.keys(error).map((key) => {
          return (
            <li>
              {key} {error[key]}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ErrorBox;

ErrorBox.propTypes = {
  error: PropTypes.node,
};

ErrorBox.defaultProps = {
  error: {},
};
