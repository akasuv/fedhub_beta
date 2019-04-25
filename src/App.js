import React, { Component } from "react";
// import ReactDOM from "react-dom";

import Header from "./components/header";
import ResourceKinds from "./components/resourceKinds";
import resourceData from "./resourceData";
import { deflate } from "zlib";

var MenuIconClickCount = 0;

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      resourceKinds: resourceData.resourceDefault,
      contentKeeper: resourceData.resourceDefault,
      // searchValue: null,
      menuClick: false,
      rotateDeg: 0,
      searchValue: "",
      focusedStyle: {
        videos: { border: "3px solid black" },
        articles: {},
        books: {}
      }
    };
  }

  topicChoose = e => {
    switch (e.target.value) {
      case "Html":
        this.setState({
          resourceKinds: resourceData.resourceHtml,
          contentKeeper: resourceData.resourceHtml
        });
        break;
      case "JavaScript":
        this.setState({
          resourceKinds: resourceData.resourceJavaScript,
          contentKeeper: resourceData.resourceJavaScript
        });
        break;
      case "React":
        this.setState({
          resourceKinds: resourceData.resourceReact,
          contentKeeper: resourceData.resourceReact
        });
        break;
      case "Vue":
        this.setState({
          resourceKinds: {
            articleKind: [],
            bookKind: [],
            videoKind: []
          }
        });
        break;
      case "Angular":
        this.setState({
          resourceKinds: {
            articleKind: [],
            bookKind: [],
            videoKind: []
          }
        });
        break;
      case "Bootstrap":
        this.setState({
          resourceKinds: {
            articleKind: [],
            bookKind: [],
            videoKind: []
          }
        });
        break;
      default:
        break;
    }
    // this.contentChoose({target:{value: "videos"}});
    this.mouseLeave();
  };
  smallestScreenTopicChoose = e => {
    this.topicChoose(e);
    this.setState({
      focusedStyle: Object.assign(
        {},
        { videos: { border: "3px solid black" } },
        { articles: { border: "none" } },
        { books: { border: "none" } }
      )
    });
    switch (e.target.value) {
      case "Html":
        this.setState({
          resourceKinds: Object.assign(
            {},
            resourceData.resourceHtml,
            { articleKind: [] },
            { bookKind: [] }
          )
        });
        break;
      case "JavaScript":
        this.setState({
          resourceKinds: Object.assign(
            {},
            resourceData.resourceJavaScript,
            { articleKind: [] },
            { bookKind: [] }
          )
        });
        break;
      case "React":
        this.setState({
          resourceKinds: Object.assign(
            {},
            resourceData.resourceReact,
            { articleKind: [] },
            { bookKind: [] }
          )
        });
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
  contentChoose = e => {
    // change content choose button style
    switch (e.target.value) {
      case "videos":
        this.setState({
          resourceKinds: Object.assign(
            {},
            this.state.contentKeeper,
            { articleKind: [] },
            { bookKind: [] }
          ),
          focusedStyle: Object.assign(
            {},
            { videos: { border: "3px solid black" } },
            { articles: { border: "none" } },
            { books: { border: "none" } }
          )
        });
        break;
      case "articles":
        this.setState({
          resourceKinds: Object.assign(
            {},
            this.state.contentKeeper,
            { videoKind: [] },
            { bookKind: [] }
          ),
          focusedStyle: Object.assign(
            {},
            { videos: { border: "none" } },
            { articles: { border: "3px solid black" } },
            { books: { border: "none" } }
          )
        });
        break;
      case "books":
        this.setState({
          resourceKinds: Object.assign(
            {},
            this.state.contentKeeper,
            { videoKind: [] },
            { articleKind: [] }
          ),
          focusedStyle: Object.assign(
            {},
            { videos: { border: "none" } },
            { articles: { border: "none" } },
            { books: { border: "3px solid black" } }
          )
        });
        break;
      default:
        break;
    }

    // change contents depending on the button
  };
  render() {
    console.log(this.state.resourceKinds.videoKind);
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
          topicChoose={this.smallestScreenTopicChoose}
          backToHome={this.backToHome}
        />
        <ResourceKinds
          // onClick={this.onClick}
          resourceKinds={this.state.resourceKinds}
          searchValue={this.state.searchValue}
          onSearch={this.onSearch}
          searchSubmit={this.searchSubmit}
          topicChoose={this.topicChoose}
          contentChoose={this.contentChoose}
          focusedStyle={this.state.focusedStyle}
          // contentSyle={this.state.contentSyle}
        />
      </div>
    );
  }
}
