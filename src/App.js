import React, { Component } from "react";
// import ReactDOM from "react-dom";

import Header from "./components/header";
import ResourceKinds from "./components/resourceKinds";
import resourceData from "./resourceData";
import resourceDataDefault from "./resourceDataDefault";
import { deflate } from "zlib";

var MenuIconClickCount = 0;
var resizeCount = 0;
var prevScroll = 0;
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      resourceKinds: resourceDataDefault.resourceDefault,
      contentKeeper: resourceDataDefault.resourceDefault,
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
      }
    };
  }

  // Change the content data from the choice
  largeScreenTopicChoose = e => {
    switch (e.target.value) {
      // When users click the HTML&CSS button,
      // the content will be assigned with
      // html data in the resourceData Object.
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

    // When the choosing action is down,
    // the menu will be closed with mouseLeave method.
    this.mouseLeave();
  };

  // When the screen becomes smaller like a phone screen,
  // Change the contents that will be shown in default.
  smallestScreenTopicChoose = e => {
    this.largeScreenTopicChoose(e);

    // Keep the button focused style on the video button as default
    this.setState({
      focusedStyle: Object.assign(
        {},
        { videos: { border: "3px solid black" } },
        { articles: { border: "none" } },
        { books: { border: "none" } }
      )
    });

    switch (e.target.value) {
      // When users choose a topic, such as the HTML topic,
      // the page will show the video related to html as default.
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
    
    //TODO: Learning more about this.
    e.preventDefault();
  };

  // When the web icon is clicked, change the content back to default.
  backToHome = () => {
    window.innerWidth < 600
      ? this.setState({
          resourceKinds: Object.assign(
            {},
            resourceDataDefault.resourceDefault,
            { articleKind: [] },
            { bookKind: [] }
          ),
          contentKeeper: resourceDataDefault.resourceDefault,
          focusedStyle: Object.assign(
            {},
            { videos: { border: "3px solid black" } },
            { articles: { border: "none" } },
            { books: { border: "none" } }
          ),
        }
        )
      : this.setState({ resourceKinds: resourceDataDefault.resourceDefault });
    this.setState({searchValue: ""});
  };

  backToHomeDataChange = () => {
    
  }
  // When users choose different content kinds,
  // videos, articles, books,
  // Show the related contents.
  contentChoose = e => {
    // console.log(e.target.value)
    switch (e.target.value) {
      // When the video button is choosen,
      case "videos":
        // Only show the video content
        // FIXME: The other two kinds of data will become null,
        // it's ok on mobile phone, but have problems on pc.
        this.setState({
          resourceKinds: Object.assign(
            {},
            this.state.contentKeeper,
            { articleKind: [] },
            { bookKind: [] }
          ),
          //give the video button a black border,
          // so the user will know
          //what kind of contents that he/she has choosed.
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

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    window.addEventListener("scroll", this.scroll.bind(this));
    this.scroll();
    this.resize();
  }

  scroll() {
    let currentScroll = window.pageYOffset;
    if (prevScroll < currentScroll) {
    this.setState({headStyle: {top: "-80px"}}) 
  }
  else {
    this.setState({headStyle: {top: "0px"}})
  };
  prevScroll = currentScroll;
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
  resize() {
    if (window.innerWidth > 599) {
      this.setState({ resourceKinds: this.state.contentKeeper })
      resizeCount = 0;
    } else 
    { 
      // When the screen becomes small,
      // only the first time of resizing 
      // need to set video content choice as default.
      resizeCount < 1 && this.contentChoose({ target: { value: "videos" } });
      resizeCount++; 
    }
      // console.log(resizeCount)
  }

  render() {
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
