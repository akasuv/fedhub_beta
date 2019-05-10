import React from "react";

export default function BookKind(props) {
  return (
    <div className="content-kind content-kind-books">
      <p className="kind-title">Books</p>
      <div className="content content-book">
        {props.books.length 
          ? (props.books.map(item => {
              let name = item.name.substring(0, 25) + '...'
              return (
                <div
                  className="vba book-kind"
                  key={item.id}
                  // style={props.contentStyle}
                >
                  <figure>
                    <img src={item.imgSrc} alt="book cover" />
                  </figure>
                  <div className="book-info">
                    <p className="book-name">
                      {
                        item.name.length > 28
                          ? name
                          : item.name
                      }
                    </p>
                    <div className="book-detail">
                      <p className="book-date">Year: {item.year}</p>
                      <p className="book-edition">Edition: {item.edition}</p>
                    </div>
                    <a href={item.link} target="blank">
                      <button className="book-download">
                        Get the book
                      </button>
                    </a>
                  </div>
                </div>
              );
            }
          )) 
          : (
              <p className="no-related" style={{ color: "grey" }}>
                No related books
              </p>
            )
        }
      </div>
    </div>
  );
}
