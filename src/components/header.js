import React from "react";
// import ReactDOM from 'react-dom';
import SearchBar from "../components/searchBar";
import TechOptions from "../components/techOptions";
import menu from "../menu.png";

// export default function Header({onClick, status, menuClick}) {
//   return (
//     <header>
//       <h1>FEDHUB</h1>
//       <img id="smallest-screen-menu" alt="menu" src={menu} />
//       {menuClick &&<div id="smallest-screen"><TechOptions /></div>}
//       <TechOptions onClick={onClick} />
//       <SearchBar status={status}/>
//     </header>
//   );
// }
  // var clickCount = 0;

  // export default class Header extends React.Component {
  //   constructor(onSearch, searchValue) {
  //     super();
  //     this.state = {
  //       menuClick: false,
  //       style: {transform: 0},
  //       searchValue: "",
  //     }
  //   }

  //   handleClick = () => {
  //     clickCount++;
  //     var deg = {...this.state.style};
  //     (clickCount % 2 !== 0) ? deg.transform += 90 : deg.transform = 0;
  //     this.setState(preState => {
  //       return {menuClick: !preState.menuClick, style: deg}});
  //   }
  //   mouseLeave = () => {
  //     (clickCount % 2 !== 0) && clickCount++;
  //     var deg = {...this.state.style};
  //     (clickCount % 2 === 0) ? deg.transform = 0 : deg.transform +=90;
  //     this.setState(preState => {
  //       return {menuClick: false, style: deg}});
  //   }
  //   onSearch = e => {
  //     this.setState({searchValue: e.target.value})
  //   }
  //   searchSubmit = e => {
  //     e.preventDefault();
  //   }

  //   render(){
    
  //     return(
  //       <header onMouseLeave={this.mouseLeave}>
  //       <h1>FEDHUB</h1>
  //       <img id="smallest-screen-menu" alt="menu" src={menu} style={{transform: `rotate(${this.state.style.transform}deg)`}} onClick={this.handleClick} />
  //       {this.state.menuClick && <div id="smallest-screen"><TechOptions /></div>}
  //       <TechOptions onClick={this.onClick} />
  //       <SearchBar 
  //         value={this.state.searchValue} 
  //         onSearch={this.onSearch}
  //         onSubmit={this.searchSubmit}  
  //       />
  //     </header>
  //     );
  //   }
  // }
export default function Header(props) {
  return(
    <header onMouseLeave={props.mouseLeave}>
    <h1 onClick={props.backToHome}>FEDHUB</h1>
    <img id="smallest-screen-menu" alt="menu" src={menu} style={{transform: `rotate(${props.rotateDeg}deg)`}} onClick={props.rotateMenuIcon} />
      <div id="smallest-screen" style={{top: `${props.menuMove}px`}}><TechOptions menuSlideDown={props.menuSlideDown} topicChoose={props.topicChoose}/></div>
    <TechOptions topicChoose={props.topicChoose} />
    <SearchBar 
      value={props.searchValue} 
      onSearch={props.onSearch}
      onSubmit={props.searchSubmit}  
    />
  </header>
  );
}