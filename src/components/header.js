import React from "react";

import SearchBar from "../components/searchBar";
import TechOptions from "../components/techOptions";
import menu from "../icons/menu.png";

export default function Header(props) {
  return (
    <header onMouseLeave={props.mouseLeave} style={props.headStyle}>
      <h1 onClick={props.backToHome}>FEDHUB</h1>
      <img
        id="smallest-screen-menu"
        alt="menu"
        src={menu}
        style={{ transform: `rotate(${props.rotateDeg}deg)` }}
        onClick={props.rotateMenuIcon}
      />
      <div id="smallest-screen" style={{ top: `${props.menuMove}px` }}>
        <TechOptions
          menuSlideDown={props.menuSlideDown}
          topicChoose={props.topicChoose}
        />
      </div>
      <TechOptions topicChoose={props.topicChoose} />
      <SearchBar
        value={props.searchValue}
        onSearch={props.onSearch}
        onSubmit={props.searchSubmit}
      />
    </header>
  );
}
