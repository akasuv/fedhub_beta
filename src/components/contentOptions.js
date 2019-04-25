import React from 'react';

export default function ContentOptions(props) {
  return(
    <ul id="content-options">
      <li><button onClick={props.contentChoose} value="videos" style={props.showFoucsed}>Videos</button></li>
      <li><button onClick={props.contentChoose} value="articles" style={{color: "red"}}>Videos</button></li>
      <li><button onClick={props.contentChoose} value="books">books</button></li>
    </ul>
  )
}