import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default function TechOptions(props) {
  return (
      <div id="tech-kind">
        <ul>
          <li>
            <Link to="/Html&CSS">Html&CSS</Link>
          </li>
          <li>
            <Link to="/JavaScript">JavaScript</Link>
          </li>
          <li>
            <Link to="/React">React</Link>
          </li>
        </ul>
      </div>
  );
}
