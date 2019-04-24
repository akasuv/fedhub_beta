import React from "react";
// import ReactDOM from "react-dom";

import VideoKind from "./videoKind";
import BookKind from "./bookKind";
import ArticleKind from "./articleKind";
import SearchBar from "./searchBar";
import TechOptions from "./techOptions";

export default function ResourceKinds(props) {
  return (
    <main>
      <SearchBar 
      value={props.searchValue} 
      onSearch={props.onSearch}
      onSubmit={props.searchSubmit}  
      />
      <TechOptions topicChoose={props.topicChoose}/>
      <div className="resource-content">
        <VideoKind videoKind={props.resourceKinds.videoKind} />
        <ArticleKind articleKind={props.resourceKinds.articleKind} />
        <BookKind bookKind={props.resourceKinds.bookKind} />
      </div>
    </main>
  );
}
