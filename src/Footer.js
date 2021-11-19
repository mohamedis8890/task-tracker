import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <h4>Copyright 2021</h4>
      <Link to="/about">About</Link>
    </footer>
  );
}
