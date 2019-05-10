import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './home';
import ReactGA from 'react-ga';
  
class App extends Component{
    render() {
      return (
        <BrowserRouter>
        <Switch>
          <Route path='/' component={Home} exact />
          {/* <Route component={PageNonexist} /> */}
        </Switch>
        </BrowserRouter>
      );
    }
  }
 
export default App;
 
ReactGA.initialize('UA-139993181-1');
ReactGA.pageview('/');
 