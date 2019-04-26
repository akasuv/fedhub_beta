import React from "react";
import searchIcon from "../images/searchIcon.png";

export default function SearchBar({ value, onSearch, onSubmit }) {
  return (
    <div className="search-bar">
      <img 
        id="search-icon" 
        alt="search-box" 
        src={searchIcon} 
      />
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={value}
          onChange={onSearch}
          //  onSubmit={onSubmit}
        />
      </form>
    </div>
  );
}
