import React from "react";

export default function VideoKind(props) {
  return (
    <div className="content-kind content-kind-videos">
      <p className="kind-title">Videos</p>
      <div className="content">
        {props.videoKind.length 
          && (props.videoKind.map((item, index) => {
              return (
                <div
                  className="vba video-kind"
                  key={index}
                  // style={props.contentStyle}
                >
                  <a
                    href={item.resourceUrl}
                    className="resource-link"
                    alt="resource-link"
                  />
                  <img src={item.imgSrc} alt="" />
                  <p className="resource-name">
                    {item.resourceName}
                  </p>
                </div>
              );
            })) 
          
        }
      </div>
    </div>
  );
}
