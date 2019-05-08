import React, { Component } from "react";
import Header from "./components/header";
import ResourceKinds from "./components/resourceKinds";
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
      resourceData: {
        videos: [],
        articles: [],
        books: [],
      },
      topicKeeper: "HomePage",
      mobileMode: false,
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
    };
  }

  dataLoad(topic, data, type) {
    const resourceData = {
      videos: [],
      articles: [],
      books: [],
    }

    if(!type) {
      for(let parentKey in resourceData) {
        for(let childKey in data[topic][parentKey]) {
          resourceData[parentKey].push(data[topic][parentKey][childKey]);
        }
      }
    } else {
      for(let key in data[topic][type]) {
        resourceData[type].push(data[topic][type][key]);
      }
    } 

    this.setState({resourceData});
  }

  backToHome = () => {
    window.innerWidth < 600
    ? this.dataLoad('HomePage', this.state.sourceData, 'videos')
    : this.dataLoad('HomePage', this.state.sourceData);
    
    this.setState({
      topicKeeper: "HomePage",
      searchValue: "",
    });
  };

  // Change the content data from the choice
  topicChoose = (e, type) => {
    this.dataLoad(e.target.value, this.state.sourceData, type);
    this.setState({topicKeeper: e.target.value, searchValue: ""});
    this.mouseLeave();
  };

  smallScreenTopicChoose = e => {
    this.topicChoose(e, "videos");
    this.focusedStyleChange({target: {value: "videos"}});
  };

  responsiveTopicChoose = e => {
    window.innerWidth > 599
      ? this.topicChoose(e)
      : this.smalleScreenTopicChoose(e);
  };

  contentChoose = e => {
    this.dataLoad(this.state.topicKeeper, this.state.sourceData, e.target.value);
    this.focusedStyleChange(e);
  };

  onSearch = e => {
    this.setState({ searchValue: e.target.value });
    this.searchSubmit(e);
  };

  searchSubmit = e => {
    const data = this.state.sourceData;
    const search = this.state.searchValue;
    const searchResult = {
      videos: [],
      articles: [],
      books: [],
    };

    for(let searchKey in searchResult) {
      for(let topicKey in data) {
        for(let dataKey in data[topicKey][searchKey]) {
          let targetName = data[topicKey][searchKey][dataKey].name;
          if(targetName) {
            if(targetName.toLowerCase().includes(search.toLowerCase())) {
              let targetValue = data[topicKey][searchKey][dataKey];
              searchResult[searchKey].push(targetValue)
            }
          }
        }
      }
    }
    
    this.setState({resourceData: searchResult});
    e.preventDefault();
  };

  focusedStyleChange = e => {
    const focusedStyle = {
      videos: {},
      articles: {},
      books: {},
    }

    for(let key in focusedStyle) {
      if (key === e.target.value ) {
        focusedStyle[key] = { border: "3px solid black" }
      }
    }

    this.setState({focusedStyle})
  }

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

  scroll() {
    let currentScroll = window.pageYOffset;
    
    if (prevScroll < currentScroll) {
      this.setState({headStyle: {top: "-80px"}})
    } else {
      this.setState({headStyle: {top: "0px"}})
    };

    !(currentScroll < 0) && (prevScroll = currentScroll);
    this.mouseLeave();
  }

  resize = () => {
    if (window.innerWidth > 599) {
      this.dataLoad(this.state.topicKeeper, this.state.sourceData)
      resizeCount = 0;
    } else 
    { 
      resizeCount < 1 && this.dataLoad(this.state.topicKeeper, this.state.sourceData, "videos");
      resizeCount++; 
    }
  }

  componentDidMount() {
    // connect to firebase database 
    const rootRef = firebase.database().ref();
    rootRef.on('value', snap => {
      const data = snap.toJSON();
      
      window.innerWidth > 600 
      ? this.dataLoad(this.state.topicKeeper, data)
      : this.dataLoad(this.state.topicKeeper, data, 'videos');
      this.setState({sourceData: data});   
    })
    
    window.addEventListener("resize", this.resize.bind(this));
    window.addEventListener("scroll", this.scroll.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize, false);
    window.removeEventListener('scroll', this.scroll, false);
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
          topicChoose={this.responsiveTopicChoose}
          backToHome={this.backToHome}
          menuSlideDown={this.state.menuSlideDown}
          menuMove={this.state.menuMove}
        />
        <ResourceKinds
          resourceKinds={this.state.resourceData}
          searchValue={this.state.searchValue}
          onSearch={this.onSearch}
          searchSubmit={this.searchSubmit}
          topicChoose={this.topicChoose}
          contentChoose={this.contentChoose}
          focusedStyle={this.state.focusedStyle}
        />
    </div>
    );
  }
}
