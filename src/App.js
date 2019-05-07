import React, { Component } from "react";
// import ReactDOM from "react-dom";

import Header from "./components/header";
import ResourceKinds from "./components/resourceKinds";
import resourceData from "./resourceData";
import resourceDataDefault from "./resourceDataDefault";
import * as firebase from 'firebase';

import { deflate } from "zlib";

var MenuIconClickCount = 0;
var resizeCount = 0;
var prevScroll = 0;
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      sourceData: null,
      resourceKinds: resourceDataDefault.resourceDefault,
      contentKeeper: resourceDataDefault.resourceDefault,
      resourceTest: {
        videos: [],
        articles: [],
        books: [],
      },
      topicKeeper: "HomePage",
      mobileMode: false,
      // searchValue: null,
      menuClick: false,
      rotateDeg: 0,
      menuSlideDown: -200,
      menuMove: -999,
      searchValue: "",
      focusedStyle: {
        videos: { border: "3px solid black" },
        articles: {},
        books: {}
      },
      headStyle: {
      },
      testData: [],
    };
  }

  // Change the content data from the choice
  largeScreenTopicChoose = e => {
    this.dataLoad(e.target.value, this.state.sourceData);
    this.setState({topicKeeper: e.target.value});
    // this.contentChoose({target:{value: "videos"}});

    // When the choosing action is down,
    // the menu will be closed with mouseLeave method.
    this.mouseLeave();
  };

  // When the screen becomes smaller like a phone screen,
  // Change the contents that will be shown in default.
  smallestScreenTopicChoose = e => {
    this.dataLoad(e.target.value, this.state.sourceData, "videos");
    this.setState({topicKeeper: e.target.value});
    // Keep the button focused style on the video button as default
    this.setState({
      focusedStyle: Object.assign(
        {},
        { videos: { border: "3px solid black" } },
        { articles: { border: "none" } },
        { books: { border: "none" } }
      )
    });
  };

  topicChoose = e => {
    window.innerWidth > 599
      ? this.largeScreenTopicChoose(e)
      : this.smallestScreenTopicChoose(e);
      this.setState({searchValue: ""});
  };

  // When the menu is clicked, the menu icon will rotate
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
    MenuIconClickCount % 2 !== 0 ? (slide = -5) : (slide = -200);

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

  // When the mouse leaved,
  // it should have an same effect to the menu like the even click time.
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

  onSearch = e => {
    this.setState({ searchValue: e.target.value });
    // this.searchSubmit(e);
  };

  // TODO:  Check if there is a better solution to do the search.
  searchSubmit = e => {
    let searchResult = {
      articleKind: [],
      bookKind: [],
      videoKind: []
    };

    // Check the search result is whether in the video kind of whole resource data
    for (let key in resourceData) {
      searchResult.videoKind = [
        ...resourceData[key].videoKind.filter(item =>
          item.resourceName
            .toLowerCase()
            .includes(this.state.searchValue.toLowerCase())
        ),
        // Using the spread operator to keep the result from being covered.
        // The result should be all the data matching the search,
        // instead of the last one.
        ...searchResult.videoKind
      ];
    }

    // Check the article kind.
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

    // Check the book kind.
    for (let key in resourceData) {
      searchResult.bookKind = [
        ...resourceData[key].bookKind.filter(item =>
          item.resourceName
            .toLowerCase()
            .includes(this.state.searchValue.toLowerCase())
        ),
        ...searchResult.bookKind
      ];

      // FIXME: search results aren't separated.
    }

    // Show the search result.
    // this.setState({ resourceKinds: searchResult, contentKeeper: searchResult });
    // TODO: need a function to reuse this.
    window.innerWidth < 600
      ? this.setState({
      resourceKinds: Object.assign(
        {},
        searchResult,
        { articleKind: [] },
        { bookKind: [] }
        ),
        contentKeeper: searchResult,
        focusedStyle: Object.assign(
          {},
          { videos: { border: "3px solid black" } },
          { articles: { border: "none" } },
          { books: { border: "none" } }
          ),
        }
        )
      : this.setState({resourceKinds: searchResult, contentKeeper: searchResult});
    
    e.preventDefault();
  };

  backToHome = () => {
    window.innerWidth < 600
    ? this.dataLoad('HomePage', this.state.sourceData, 'videos')
    : this.dataLoad('HomePage', this.state.sourceData);
    
    this.setState({
      topicKeeper: "HomePage",
      searchValue: "",
    });
  };

  contentChoose = e => {
    this.dataLoad(this.state.topicKeeper, this.state.sourceData, e.target.value);
  };

  componentDidMount() {
    // connect to firebase database 
    const rootRef = firebase.database().ref();
    rootRef.on('value', snap => {
      const data = snap.toJSON();
      this.dataLoad('HomePage', data);
      this.setState({sourceData: data});
      this.resize(data);
    })

    window.addEventListener("resize", this.resize.bind(this));
    window.addEventListener("scroll", this.scroll.bind(this));
    this.scroll();
  }

  dataLoad(topic, data, type) {
    const resourceTest = {
      videos: [],
      articles: [],
      books: [],
    }

    if(!type) {
      for(let parentKey in resourceTest) {
        for(let childKey in data[topic][parentKey]) {
          resourceTest[parentKey].push(data[topic][parentKey][childKey]);
        }
      }
    } else {
      for(let key in data[topic][type]){
        resourceTest[type].push(data[topic][type][key]);
      }
    } 

    this.setState({resourceTest});
  }

  scroll() {
    let currentScroll = window.pageYOffset;
    if (prevScroll < currentScroll) {
      this.setState({headStyle: {top: "-80px"}})
    }
    else {
      this.setState({headStyle: {top: "0px"}})
    };
    !(currentScroll < 0) && (prevScroll = currentScroll);
    this.mouseLeave();
  }

  componentWillUnmount() {
    // you need to unbind the same listener that was binded.
    window.removeEventListener('resize', this.resize, false);
}
componentDidUpdate() {
}
  // When the window is resized to small,
  // the content will be separated into three parts,
  // two of them is empty, so if you resize it back,
  // the page will show the two is empty.
  // To fix that, I need detect the resize action,
  // when it's resized back,
  // the data will be reset using the contentKeeper.
  resize(data) {
    if (window.innerWidth > 599) {
      this.setState({ resourceKinds: this.state.contentKeeper })
      resizeCount = 0;
    } else 
    { 
      // When the screen becomes small,
      // only the first time of resizing 
      // need to set video content choice as default.
      resizeCount < 1 && this.dataLoad(this.state.topicKeeper, data, "video");
      resizeCount++; 
    }
      // console.log(resizeCount)
  }

  render() {
    console.log(this.state.resourceTest.videos.length);
    return (
      <div>
        <Header
          headStyle={this.state.headStyle}
          rotateDeg={this.state.rotateDeg}
          mouseLeave={this.mouseLeave}
          rotateMenuIcon={this.rotateMenuIcon}
          menuClick={this.state.menuClick}
          searchValue={this.state.searchValue}
          onSearch={this.onSearch}
          searchSubmit={this.searchSubmit}
          topicChoose={this.topicChoose}
          backToHome={this.backToHome}
          menuSlideDown={this.state.menuSlideDown}
          menuMove={this.state.menuMove}
        />
        <ResourceKinds
          // onClick={this.onClick}
          resourceKinds={this.state.resourceTest}
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
