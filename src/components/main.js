import React from "react";
// import ResourceKinds from "./components/resourceKinds";
import * as firebase from "firebase";
import loading from "../icons/loading.gif";
import ResourceKinds from "./resourceKinds";

var resizeCount = 0;
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
      focusedStyle: {
        videos: { border: "3px solid black" },
        articles: {},
        books: {}
      },
      focusedStyleDefault: {
        target: {
          value: "videos"
        }
      }
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

    this.setState({ resourceData });
    this.setState({});
  }

  onSearch = e => {
    this.setState({ searchValue: e.target.value });
  };

  searchSubmit = (searchParam, fireData) => {
    console.log("searching....");
    console.log(searchParam);
    console.log(fireData);
    const data = { ...fireData };
    const search = searchParam;
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

    this.setState({
      resourceData: searchResult,
      keepSearchData: searchResult
    });
  };

  keepSearchRes = (type = null) => {
    const resourceData = {
      videos: [],
      articles: [],
      books: []
    };

    this.state.keepSearchData[type].map(item => {
      resourceData[type].push(item);
    });

    this.setState({ resourceData });
  };

  contentChoose = e => {
    !this.state.keepSearchData
      ? this.dataLoad(
          this.state.topicKeeper,
          this.state.sourceData,
          e.target.value
        )
      : this.keepSearchRes(e.target.value);

    this.focusedStyleChange(e);
  };

  focusedStyleChange = (e = this.state.focusedStyleDefault) => {
    const focusedStyle = {
      videos: {},
      articles: {},
      books: {}
    };

    for (let key in focusedStyle) {
      if (key === e.target.value) {
        focusedStyle[key] = { border: "3px solid black" };
      }
    }

    this.setState({ focusedStyle });
  };

  componentDidMount() {
    let topic = this.props.match.params.name || "HomePage";
    // connect to firebase database
    const rootRef = firebase.database().ref();
    
    rootRef.on("value", snap => {
      const data = snap.toJSON();

      window.innerWidth > 600
        ? this.dataLoad(topic, data)
        : this.dataLoad(topic, data, "videos");

      this.setState({ sourceData: data, topicKeeper: topic });

      window.addEventListener("click", this.click.bind(this));
      window.addEventListener("submit", this.submit.bind(this));
      window.addEventListener("resize", this.resize.bind(this));
      }
    );
  }

  submit = () => {
    let params = new URLSearchParams(this.props.location.search);
    let search = params.get("search");

    search && this.searchSubmit(search, this.state.sourceData);
    this.setState({ topicKeeper: "" });
  };

  click = () => {
    let topic = this.props.match.params.name || "HomePage";

    if (topic !== this.state.topicKeeper) {
      if (window.innerWidth < 600) {
        this.dataLoad(topic, this.state.sourceData, "videos");
        this.focusedStyleChange();
      } else {
        this.dataLoad(topic, this.state.sourceData);
      }
    }

    this.setState({ topicKeeper: topic, searchValue: "", keepSearchData: "" });
  };

  resize = () => {
    if (window.innerWidth > 599) {
      !this.state.keepSearchData
        ? this.dataLoad(this.state.topicKeeper, this.state.sourceData)
        : this.setState({ resourceData: this.state.keepSearchData });
      
      resizeCount = 0;
    } else {
      if (resizeCount < 1) {
        !this.state.keepSearchData
          ? this.dataLoad(
              this.state.topicKeeper,
              this.state.sourceData,
              "videos"
            )
          : this.keepSearchRes("videos");

        this.focusedStyleChange({ target: { value: "videos" } });
      }
      resizeCount++;
    }
  };

  render() {
    return this.state.sourceData ? (
      <ResourceKinds
        resourceKinds={this.state.resourceData}
        searchValue={this.state.searchValue}
        onSearch={this.onSearch}
        searchSubmit={this.searchSubmit}
        topicChoose={this.topicChoose}
        contentChoose={this.contentChoose}
        focusedStyle={this.state.focusedStyle}
      />
    ) : (
      <div id="loading">
        <img src={loading} alt="loading" />
      </div>
    );
  }
}

export default Main;
