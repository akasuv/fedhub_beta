import React from "react";

export default function ArticleKind(props) {
  return (
    <div className="content-kind content-kind-articles">
      <p className="kind-title">Articles</p>
      <div className="content">
        {/* If the article kind has data, show the content */}
        {props.articleKind.length
          // Map the data, and insert it into article section on page.
          ? (props.articleKind.map((item, index) => {
              return (
                <div
                  className="vba article-kind"
                  key={index}
                  // style={props.contentStyle}
                >
                  <a
                    href={item.resourceUrl}
                    className="resource-link"
                    alt="resource-link"
                  />
                  <figure>
                    <img src={item.imgSrc} alt="article" />
                  </figure>
                  <p className="resource-name">
                    {item.resourceName}
                  </p>
                  <p className="from">from Medium</p>
                </div>
                );
              }
            )) 
          : (
              <p className="no-related" style={{ color: "grey" }}>
                No related articles
              </p>
            )
        }
      </div>
    </div>
  );
}
