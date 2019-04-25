import React from 'react';

export default function ContentOptions(props) {
  return(
    <ul id="content-options">
      <li><button onClick={props.contentChoose} value="videos" style={props.focusedStyle.videos}>Videos</button></li>
      <li><button onClick={props.contentChoose} value="articles" style={props.focusedStyle.articles}>Articles</button></li>
      <li><button onClick={props.contentChoose} value="books" style={props.focusedStyle.books}>books</button></li>
    </ul>
  )
}