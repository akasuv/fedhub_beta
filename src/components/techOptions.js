import React from "react";
import Button from "./theButton";
import Header from "./header";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default function TechOptions(props) {
  return (
    <Router>
      <div id="tech-kind">
        <ul style={{ top: `${props.menuSlideDown}px` }}>
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
      {/* <Route path="/:name?" component={Header} /> */}
    </Router>
  );
}
