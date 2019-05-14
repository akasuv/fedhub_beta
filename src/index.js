import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebaseConfig from './firebaseConfig';
import * as firebase from 'firebase';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
// import * as serviceWorker from './serviceWorker';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const routing = (
  <Router>
      <Route exact path="/" component={App} />
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
