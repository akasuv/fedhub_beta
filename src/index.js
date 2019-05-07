import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as firebase from 'firebase';
// import * as serviceWorker from './serviceWorker';

var firebaseConfig = {
  apiKey: "AIzaSyDBrYi8WFejc3qBzeVafbjvzVnDaeRPBGs",
  authDomain: "fedhub-1b9bd.firebaseapp.com",
  databaseURL: "https://fedhub-1b9bd.firebaseio.com",
  projectId: "fedhub-1b9bd",
  storageBucket: "fedhub-1b9bd.appspot.com",
  messagingSenderId: "778031414036",
  appId: "1:778031414036:web:35306500db2a8a3b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
