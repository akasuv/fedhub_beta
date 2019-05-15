import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './components/header';
import firebaseConfig from './firebaseConfig';
import * as firebase from 'firebase';
// import * as serviceWorker from './serviceWorker';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


ReactDOM.render(<Header />, document.getElementById('root'));
module.hot && module.hot.accept();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
