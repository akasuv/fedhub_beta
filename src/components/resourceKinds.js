import React from "react";
// import ReactDOM from "react-dom";

import VideoKind from "./videoKind";
import BookKind from "./bookKind";
import ArticleKind from "./articleKind";
import SearchBar from "./searchBar";
import TechOptions from "./techOptions";
import ContentOptions from "./contentOptions";

export default function ResourceKinds(props) {
  return (
    <main>
      <SearchBar
        value={props.searchValue}
        onSearch={props.onSearch}
        onSubmit={props.searchSubmit}
      />
      <TechOptions topicChoose={props.topicChoose} />
      <ContentOptions
        contentChoose={props.contentChoose}
        focusedStyle={props.focusedStyle}
      />
      <div className="resource-content">
        <VideoKind
          videoKind={props.resourceKinds.videoKind}
          // contentStyle={props.contentStyle.videos}
        />
        <ArticleKind
          articleKind={props.resourceKinds.articleKind}
          // contentStyle={props.contentStyle.articles}
        />
        <BookKind
          bookKind={props.resourceKinds.bookKind}
          // contentStyle={props.contentStyle.books}
        />
      </div>
    </main>
  );
}
