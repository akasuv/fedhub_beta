import React from "react";

export default function BookKind(props) {
  return (
    <div className="content-kind content-kind-books">
      <p className="kind-title">Books</p>
      <div className="content content-book">
        {props.books.length 
          ? (props.books.map((item, index) => {
              return (
                <div
                  className="vba book-kind"
                  key={index}
                  // style={props.contentStyle}
                >
                  <figure>
                    <img src={item.imgSrc} alt="books" />
                  </figure>
                  <div className="book-info">
                    <p className="book-name">{item.resourceName}</p>
                    <p className="book-date">Year: 2019</p>
                    <p className="book-edition">Edition: 1st</p>
                    <p className="book-isbn">ISBN: 9781593270117</p>
                    <p className="book-recommend">1299 readers liked it</p>
                    <button className="book-download">Recommend</button>
                    <button className="book-download">Get the book</button>
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
