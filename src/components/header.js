import React from "react";
import SearchBar from "../components/searchBar";
import TechOptions from "../components/techOptions";
import menu from "../icons/menu.png";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Main from "./main";

var MenuIconClickCount = 0;

export default class Header extends React.Component {
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
    // if the menu click time is odd,
    // and the user leaved, the click time should add one,
    // so it will be like an even time click.
    MenuIconClickCount % 2 !== 0 && MenuIconClickCount++;
    var degChange = 0;
    var slide = 0;
    var move = 0;
    MenuIconClickCount % 2 !== 0 ? (slide = -5) : (slide = -200);
    MenuIconClickCount % 2 === 0 ? (degChange = 0) : (degChange = -90);
    MenuIconClickCount % 2 !== 0 ? (move = 60) : (move = -999);

    this.setState({
      menuClick: false,
      rotateDeg: degChange,
      menuSlideDown: slide,
      menuMove: move
    });
  };

  backToHome = () => {
    window.innerWidth < 600
      ? this.dataLoad("HomePage", this.state.sourceData, "videos")
      : this.dataLoad("HomePage", this.state.sourceData);

    this.focusedStyleChange({ target: { value: "videos" } });
    this.resetKeepers("HomePage");
  };

  rotateMenuIcon = () => {
    MenuIconClickCount++;
    var degChange = 0;
    var slide = 0;
    var move = 0;

    // If the click time is odd,
    // the icon will rotate 90 degrees, the menu will slide down
    // and if the click time is even, the icon will back to
    // the default position, the menu will slide up.
    MenuIconClickCount % 2 !== 0 ? (degChange = 90) : (degChange = -90);
    MenuIconClickCount % 2 !== 0 ? (slide = -85) : (slide = -200);

    //TODO: The menu position covers the content choosing button.
    MenuIconClickCount % 2 !== 0 ? (move = 60) : (move = -999);

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

  searchSubmit = e => {
    const data = { ...this.state.sourceData };
    const search = this.state.searchValue;
    const searchResult = {
      videos: [],
      articles: [],
      books: []
    };

    delete data.HomePage;

    for (let topicKey in data) {
      for (let searchKey in searchResult) {
        for (let dataKey in data[topicKey][searchKey]) {
          let targetName = data[topicKey][searchKey][dataKey].name;
          if (targetName) {
            if (targetName.toLowerCase().includes(search.toLowerCase())) {
              let targetValue = data[topicKey][searchKey][dataKey];
              searchResult[searchKey].push(targetValue);
            }
          }
        }
      }
    }

    this.state.searchValue &&
      this.setState({
        resourceData: searchResult,
        keepSearchData: searchResult
      });
    e.preventDefault();
  };

  render() {
    return (
      <Router>
        <header onMouseLeave={this.mouseLeave} style={this.state.headStyle}>
          <h1><Link to="/">FEDHUB</Link></h1>
          <img
            id="smallest-screen-menu"
            alt="menu"
            src={menu}
            style={{ transform: `rotate(${this.state.rotateDeg}deg)` }}
            onClick={this.rotateMenuIcon}
          />
          {/* <div id="smallest-screen" style={{ top: `${this.state.menuMove}px` }}>
            <TechOptions
              menuSlideDown={this.state.menuSlideDown}
              topicChoose={this.topicChoose}
            />
          </div> */}
          {/* <TechOptions topicChoose={this.topicChoose} /> */}

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

          <SearchBar
            value={this.state.searchValue}
            onSearch={this.onSearch}
            onSubmit={this.searchSubmit}
          />
        </header>
        <Route path="/:name?" component={Main} />
      </Router>
    );
  }
}
