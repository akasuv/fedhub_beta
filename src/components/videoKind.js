import React from "react";

export default function VideoKind(props) {
  return (
    <div className="content-kind content-kind-videos">
      <p className="kind-title">Videos</p>
      <div className="content">
        {props.videos.length 
          && (props.videos.map((item, index) => {
              return (
                <div
                  className="vba video-kind"
                  key={item.id}
                  // style={props.contentStyle}
                >
                  <a
                    href={item.videoUrl}
                    className="resource-link"
                    alt="resource-link"
                    target="blank"
                  >
                  <figure>
                    <img src={item.img} alt="" />
                  </figure>
                  <p className="resource-name">
                    {item.name}
                  </p>
                  </a>
                </div>
              );
            })) 
          
        }
      </div>
    </div>
  );
}
