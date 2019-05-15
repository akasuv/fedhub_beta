import React from "react";

export default function ArticleKind(props) {
  return (
    <div className="content-kind content-kind-articles">
      <p className="kind-title">Articles</p>
      <div className="content">
        {/* If the article kind has data, show the content */}
        {props.articles.length
          // Map the data, and insert it into article section on page.
          && (props.articles.map(item => {
              return (
                <div
                  className="vba article-kind"
                  key={item.id}
                  // style={props.contentStyle}
                >
                  <a
                    href={item.link}
                    className="resource-link"
                    alt="resource-link"
                    target="blank"
                  >
                  <figure>
                    <img src={item.imgSrc} alt="article" />
                  </figure>
                  <p className="resource-name">
                    {item.name}
                  </p>
                  <p className="from">from Medium</p>
                  </a>
                </div>
                );
              }
            )) 
        }
      </div>
    </div>
  );
}
