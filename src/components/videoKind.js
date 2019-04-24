import React from "react";
import ReactDOM from "react-dom";

export default function VideoKind(props) {
  return (
    <div className="content-kind">
      <p className="kind-title">Videos</p>
      <div className="content">
        {props.videoKind.length ? props.videoKind.map((item, index) => {
          return (
            <div className="vba video-kind" key={index}>
              <a href={item.resourceUrl} className="resource-link" alt="resource-link"></a>
              <img src={item.imgSrc} alt="" />
              <p className="resource-name">{item.resourceName}</p>
            </div>
          );
        }): <p style={{color: "grey"}}>No related videos</p>}
      </div>
    </div>
  );
}
