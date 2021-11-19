import React from "react";
import PropTypes from "prop-types";

export default function Button({ text, color }) {
  return (
    <button className="btn" style={{ backgroundColor: color }}>
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
};

Button.defaultProps = {
  color: "steelblue",
};
