import React, { Component } from "react";
// import ReactDOM from "react-dom";

import Header from "./components/header";
import ResourceKinds from "./components/resourceKinds";
import resourceData from "./resourceData";

var MenuIconClickCount = 0;

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      resourceKinds: resourceData.resourceDefault,
      // searchValue: null,
      menuClick: false,
      rotateDeg: 0,
      searchValue: ""
    };
  }

  topicChoose = e => {
    switch (e.target.value) {
      case "Html":
        this.setState({ resourceKinds: resourceData.resourceHtml });
        break;
      case "JavaScript":
        this.setState({ resourceKinds: resourceData.resourceJavaScript });
        break;
      case "React":
        this.setState({ resourceKinds: resourceData.resourceReact });
        break;
      case "Vue":
        this.setState({ resourceKinds: {
          articleKind: [],
          bookKind: [],
          videoKind: []
        }});
        break;
      case "Angular":
        this.setState({ resourceKinds: {
          articleKind: [],
          bookKind: [],
          videoKind: []
        } });
        break;
      case "Bootstrap":
        this.setState({ resourceKinds:{
          articleKind: [],
          bookKind: [],
          videoKind: []
        }});
        break;
      default:
        break;
    }
  };

  rotateMenuIcon = () => {
    MenuIconClickCount++;
    var degChange = 0;
    MenuIconClickCount % 2 !== 0 ? (degChange = 90) : (degChange = -90);
    this.setState(preState => {
      return {
        menuClick: !preState.menuClick,
        rotateDeg: preState.rotateDeg + degChange
      };
    });
  };

  mouseLeave = () => {
    MenuIconClickCount % 2 !== 0 && MenuIconClickCount++;
    var degChange = 0;
    MenuIconClickCount % 2 === 0 ? (degChange = 0) : (degChange = -90);
    this.setState({ menuClick: false, rotateDeg: degChange });
  };

  onSearch = e => {
    this.setState({ searchValue: e.target.value });
  };

  searchSubmit = e => {
    let searchResult = {
      articleKind: [],
      bookKind: [],
      videoKind: []
    };
    for (let key in resourceData) {
      searchResult.videoKind = [
        ...resourceData[key].videoKind.filter(item =>
          item.resourceName
            .toLowerCase()
            .includes(this.state.searchValue.toLowerCase())
        ),
        ...searchResult.videoKind
      ];
    }
    for (let key in resourceData) {
      searchResult.articleKind = [
        ...resourceData[key].articleKind.filter(item =>
          item.resourceName
            .toLowerCase()
            .includes(this.state.searchValue.toLowerCase())
        ),
        ...searchResult.articleKind
      ];
    }
    for (let key in resourceData) {
      searchResult.bookKind = [
        ...resourceData[key].bookKind.filter(item =>
          item.resourceName
            .toLowerCase()
            .includes(this.state.searchValue.toLowerCase())
        ),
        ...searchResult.bookKind
      ];
    }
    this.setState({ resourceKinds: searchResult });
    e.preventDefault();
  };
  backToHome = () => {
    this.setState({ resourceKinds: resourceData.resourceDefault });
  };
  render() {
    console.log(this.state.resourceKinds);
    return (
      <div>
        <Header
          rotateDeg={this.state.rotateDeg}
          mouseLeave={this.mouseLeave}
          rotateMenuIcon={this.rotateMenuIcon}
          menuClick={this.state.menuClick}
          searchValue={this.state.searchValue}
          onSearch={this.onSearch}
          searchSubmit={this.searchSubmit}
          topicChoose={this.topicChoose}
          backToHome={this.backToHome}
        />
        <ResourceKinds
          // onClick={this.onClick}
          resourceKinds={this.state.resourceKinds}
          searchValue={this.state.searchValue}
          onSearch={this.onSearch}
          searchSubmit={this.searchSubmit}
          topicChoose={this.topicChoose}
        />
      </div>
    );
  }
}
