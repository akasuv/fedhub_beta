import React from "react";

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
        {props.resourceKinds.videoKind.length ? (
          <VideoKind
            videoKind={props.resourceKinds.videoKind}
            // contentStyle={props.contentStyle.videos}
          />
        ) : null}
        {props.resourceKinds.articleKind.length ? (
          <ArticleKind
            articleKind={props.resourceKinds.articleKind}
            // contentStyle={props.contentStyle.articles}
          />
        ) : null}
        {props.resourceKinds.bookKind.length ? (
          <BookKind
            bookKind={props.resourceKinds.bookKind}
            // contentStyle={props.contentStyle.books}
          />
        ) : null}
        {!props.resourceKinds.videoKind.length &&
          !props.resourceKinds.articleKind.length &&
          !props.resourceKinds.bookKind.length && (
            <p className="no-results">No results</p>
          )}
      </div>
    </main>
  );
}
