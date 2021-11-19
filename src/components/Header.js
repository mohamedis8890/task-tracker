import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";

export default function Header({ title, setFormVisibility, formVisibility }) {
  return (
    <header className="header">
      <h1>{title}</h1>
      <Button
        text={formVisibility ? "Cancel" : "Add"}
        color={formVisibility ? "red" : "steelblue"}
        setFormVisibility={setFormVisibility}
        formVisibility={formVisibility}
      />
    </header>
  );
}

Header.defaultProps = {
  title: "Task Tracker",
};

Header.protoTypes = {
  title: PropTypes.string,
};
