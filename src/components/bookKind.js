import React from "react";

export default function BookKind(props) {
  return (
    <div className="content-kind content-kind-books">
      <p className="kind-title">Books</p>
      <div className="content content-book">
        {props.bookKind.length ? (
          props.bookKind.map((item, index) => {
            return (
              <div
                className="vba book-kind"
                key={index}
                // style={props.contentStyle}
              >
                <figure>
                  <img src={item.imgSrc} alt="books" />
                </figure>
              </div>
            );
          })
        ) : (
          <p className="no-related" style={{ color: "grey" }}>
            No related books
          </p>
        )}
      </div>
    </div>
  );
}
