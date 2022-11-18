import { PropTypes } from "prop-types";
import React from "react";

function ErrorBox({ error }) {
  return (
    <div>
      Please fix all the issues and try again.
      <ol>
        {Object.keys(error).map((key) => {
          if (error[key]) {
            return (
              <li>
                <strong>{key}</strong> {error[key]}
              </li>
            );
          }
          return null;
        })}
      </ol>
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
