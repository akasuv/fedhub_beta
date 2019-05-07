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
        {props.resourceKinds.videos.length ? (
          <VideoKind
            videos={props.resourceKinds.videos}
            // contentStyle={props.contentStyle.videos}
          />
        ) : null}
        {props.resourceKinds.articles.length ? (
          <ArticleKind
            articles={props.resourceKinds.articles}
            // contentStyle={props.contentStyle.articles}
          />
        ) : null}
        {props.resourceKinds.books.length ? (
          <BookKind
            books={props.resourceKinds.books}
            // contentStyle={props.contentStyle.books}
          />
        ) : null}
        {!props.resourceKinds.videos.length &&
          !props.resourceKinds.articles.length &&
          !props.resourceKinds.books.length && (
            <p className="no-results">No results</p>
          )}
      </div>
    </main>
  );
}
