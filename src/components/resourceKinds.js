import React from "react";

import VideoKind from "./videoKind";
import BookKind from "./bookKind";
import ArticleKind from "./articleKind";
import SearchBar from "./searchBar";
import TechOptions from "./techOptions";
import ContentOptions from "./contentOptions";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default function ResourceKinds(props) {
  return (
    <main>
      {window.innerWidth < 600 ? (
        <section>
          <Route
            render={({ history }) => (
              <SearchBar
                value={props.searchValue}
                onSearch={props.onSearch}
                onSubmit={e => {
                  history.push(`/?search=${props.searchValue}`);
                  e.preventDefault();
                }}
              />
            )}
          />
          <div id="tech-kind">
            <ul>
              <li>
                <Link to="/Html&CSS">Html&CSS</Link>
              </li>
              <li>
                <Link to="/JavaScript">JavaScript</Link>
              </li>
              <li>
                <Link to="/React">React</Link>
              </li>
            </ul>
          </div>
          <ContentOptions
            contentChoose={props.contentChoose}
            focusedStyle={props.focusedStyle}
          />
        </section>
      ) : 
          <Route
            render={({ history }) => (
              <SearchBar
                value={props.searchValue}
                onSearch={props.onSearch}
                onSubmit={e => {
                  history.push(`/?search=${props.searchValue}`);
                  e.preventDefault();
                }}
              />
            )}
          />
      }
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
