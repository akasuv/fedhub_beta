import React from "react";

export default function ContentOptions(props) {
  return (
    <ul id="content-options">
      <li>
        <button
          onClick={props.contentChoose}
          value="videoKind"
          style={props.focusedStyle.videos}
        >
          Videos
        </button>
      </li>
      <li>
        <button
          onClick={props.contentChoose}
          value="articleKind"
          style={props.focusedStyle.articles}
        >
          Articles
        </button>
      </li>
      <li>
        <button
          onClick={props.contentChoose}
          value="bookKind"
          style={props.focusedStyle.books}
        >
          Books
        </button>
      </li>
    </ul>
  );
}
