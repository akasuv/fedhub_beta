import React from 'react';

export default function ArticleKind(props) {
  return (
    <div className="content-kind">
      <p className="kind-title">Articles</p>
      <div className="content">
         { props.articleKind.length ?
          props.articleKind.map((item, index) => {
          return (
            <div className="vba article-kind" key={index}>
              <a href={item.resourceUrl} className="resource-link" alt="resource-link"></a>
              <figure><img src={item.imgSrc} alt="article" /></figure>
              <p className="resource-name">{item.resourceName}</p>
              <p className="from">from Medium</p>
            </div>
          );
            }
          )
        : <p style={{color: "grey"}}>No related articles</p>}
      </div>
    </div>
  );
}