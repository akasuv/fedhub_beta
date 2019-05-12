import React, { Component } from "react";
// import ResourceKinds from "./components/resourceKinds";
import * as firebase from "firebase";
import loading from "../icons/loading.gif";
import ReactGA from "react-ga";
import { deflate } from "zlib";
import VideoKind from "./videoKind";
import ArticleKind from "./articleKind";
import BookKind from "./bookKind";

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

    this.setState({ resourceData,
      topicKeeper: this.props.match.params.name,
    });
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
      this.setState({ sourceData: data, topicKeeper: topic});

      window.addEventListener("click", this.click.bind(this));

    });
  }

  click = () => {
    let topic = this.props.match.params.name || "HomePage";
    this.state.topicKeeper !== topic
    && this.dataLoad(topic, this.state.sourceData);
    
  }

  render() {
    console.log(this.props.match.params.name || "HomePage")
    return this.state.sourceData ? (
      <main>
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
