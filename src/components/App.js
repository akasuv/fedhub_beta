import React from "react";
import SearchBar from "../components/searchBar";
import menu from "../icons/menu.png";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Main from "./main";
import TechOptions from "./techOptions";

var MenuIconClickCount = 0;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      headStyle: {},
      rotateDeg: 0,
      menuMove: -999,
      menuSlideDown: -200,
      searchValue: ""
    };
  }
  
  mouseLeave = () => {
    MenuIconClickCount % 2 !== 0 && MenuIconClickCount++;
    let degChange = 0;
    let slide = 0;
    let move = 0;
    if (MenuIconClickCount % 2 !== 0){
      slide = -5;
      move = 60;
      degChange = -90;
    } else {
      slide = -200;
      move = -999;
      degChange = 0;
    }

    this.setState({
      menuClick: false,
      rotateDeg: degChange,
      menuSlideDown: slide,
      menuMove: move
    });
  };

  rotateMenuIcon = () => {
    MenuIconClickCount++;
    let degChange = 0;
    let slide = 0;
    let move = 0;

    if (MenuIconClickCount % 2 !== 0){
      slide = -85;
      move = 60;
      degChange = 90;
    } else {
      slide = -200;
      move = -999;
      degChange = -90;
    }

    this.setState(preState => {
      return {
        menuClick: !preState.menuClick,
        rotateDeg: preState.rotateDeg + degChange,
        menuSlideDown: slide,
        menuMove: move
      };
    });
  };

  onSearch = e => {
    this.setState({ searchValue: e.target.value });
  };

  render() {
    return (
      <Router>
        <header onMouseLeave={this.mouseLeave} style={this.state.headStyle}>
          <h1>
            <Link to="/">FedHub</Link>
          </h1>
          {
            window.innerWidth < 600 && (
              <img
                id="smallest-screen-menu"
                alt="menu"
                src={menu}
                style={{ transform: `rotate(${this.state.rotateDeg}deg)` }}
                onClick={this.rotateMenuIcon}
              />
            )
          }
          {
            window.innerWidth < 600 ? (
            <div
              id="smallest-screen"
              style={{ top: `${this.state.menuMove}px` }}
            >
              <div id="tech-kind">
                <ul style={{ top: `${this.state.menuSlideDown}px` }}>
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
            </div>
          ) : (
            <TechOptions />
          )}
          <Route
            render={({ history }) => (
              <SearchBar
                value={this.state.searchValue}
                onSearch={this.onSearch}
                onSubmit={e => {
                  this.state.searchValue 
                    && history.push(`/?search=${this.state.searchValue}`);

                  e.preventDefault();
                }}
              />
            )}
          />
        </header>
        <Route path="/:name?" component={Main} />
      </Router>
    );
  }
}

export default App;