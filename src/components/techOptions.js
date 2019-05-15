import React from "react";
import Button from "./theButton";
import Header from "./header";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default function TechOptions(props) {
  return (
      <div id="tech-kind">
        <ul>
          <li>
            <Link to="/fedhub_beta/Html&CSS">Html&CSS</Link>
          </li>
          <li>
            <Link to="/fedhub_beta/JavaScript">JavaScript</Link>
          </li>
          <li>
            <Link to="/fedhub_beta/React">React</Link>
          </li>
        </ul>
      </div>
  );
}
