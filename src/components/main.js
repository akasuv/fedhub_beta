import React, { Component } from "react";
// import ResourceKinds from "./components/resourceKinds";
import * as firebase from "firebase";
import loading from "../icons/loading.gif";
import ReactGA from "react-ga";
import { deflate } from "zlib";
import VideoKind from "./videoKind";
import ArticleKind from "./articleKind";
import BookKind from "./bookKind";
import SearchBar from "./searchBar";

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      topicKeeper: "HomePage",
      resourceData: {
        videos: [],
        articles: [],
        books: []
      },
      sourceData: null,
      searchValue: "",
    };
  }

  dataLoad(topic, data, type) {
    const resourceData = {
      videos: [],
      articles: [],
      books: []
    };

    if (!type) {
      for (let parentKey in resourceData) {
        for (let childKey in data[topic][parentKey]) {
          resourceData[parentKey].push(data[topic][parentKey][childKey]);
        }
      }
    } else {
      for (let key in data[topic][type]) {
        resourceData[type].push(data[topic][type][key]);
      }
    }

    this.setState({ resourceData, topicKeeper: this.props.match.params.name });
  }

  onSearch = e => {
    this.setState({ searchValue: e.target.value });
  };

  searchSubmit = e => {
    const data = {...this.state.sourceData};
    const search = this.state.searchValue;
    const searchResult = {
      videos: [],
      articles: [],
      books: [],
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
    
    this.state.searchValue && this.setState(
      {
        resourceData: searchResult,
        keepSearchData: searchResult,        
      }
    );
    e.preventDefault();
  };

  keepSearchRes = (type=null) => {
    const resourceData = {
      videos: [],
      articles: [],
      books: []
    }
    
    this.state.keepSearchData[type].map(item => {
      resourceData[type].push(item);    
    });

    this.setState({resourceData});
  }

  componentDidMount() {
    let topic = this.props.match.params.name || "HomePage";
    // connect to firebase database
    const rootRef = firebase.database().ref();
    rootRef.on("value", snap => {
      const data = snap.toJSON();

      // window.innerWidth > 600
      this.dataLoad(topic, data);
      //   : this.dataLoad(this.state.topicKeeper, data, "videos");
      this.setState({ sourceData: data, topicKeeper: topic });

      window.addEventListener("click", this.click.bind(this));
    });
  }

  click = () => {
    let topic = this.props.match.params.name || "HomePage";
    this.state.topicKeeper !== topic &&
      this.dataLoad(topic, this.state.sourceData);
  };

  render() {
    return this.state.sourceData ? (
      <main>
        <SearchBar
          value={this.state.searchValue}
          onSearch={this.onSearch}
          onSubmit={this.searchSubmit}
        />
        <div className="resource-content">
          <VideoKind
            videos={this.state.resourceData.videos}
            // contentStyle={props.contentStyle.videos}
          />
          <ArticleKind
            articles={this.state.resourceData.articles}
            // contentStyle={props.contentStyle.articles}
          />
          <BookKind
            books={this.state.resourceData.books}
            // contentStyle={props.contentStyle.books}
          />
        </div>
      </main>
    ) : (
      <div>Loading...</div>
    );
  }
}

export default Main;
