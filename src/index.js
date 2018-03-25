import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import members from './members.json';
import firebase from 'firebase';

const initialState = {
    currentPage: "home",    // page to show
    currentMask: 99,        // first two digits in lgh      
    currentSearch: "",      // search pattern from input field
    members: members
}
  function reducer(state = initialState, action) {
      console.log('reducer action: ', action, ', payload: ', action.payload);
      var oldmask = state.currentMask;
      var newmask = oldmask;
      // valid range for mask is 12-17 and 22-28 

      switch (action.type) {
          case 'GOTOHOME':
              return {
                  currentPage: "home",
                  members: state.members
              };
          case 'GOTOFLOOR':
              return {
                  currentPage: "floor",
                  currentMask: action.payload,
                  members: state.members
              };
          case 'GOUP':
              if (oldmask < 17 || (oldmask >= 22 && oldmask < 28)) {
                  newmask = oldmask + 1;
              };
              return {
                  currentPage: "floor",
                  currentMask: newmask,
                  members: state.members
              };
          case 'GODOWN':
              if (oldmask > 22 || (oldmask > 12 && oldmask <= 17)) {
                  newmask = oldmask - 1;
              };
              return {
                  currentPage: "floor",
                  currentMask: newmask,
                  members: state.members
              };
          case 'GOTOSEARCH':
              return {
                  currentPage: "search",
                  currentMask: state.currentMask,
                  members: state.members,
                  currentSearch: state.currentSearch,
              };
          case 'SETSEARCH':
              return {
                  currentPage: "search",
                  currentMask: state.currentMask,
                  members: state.members,
                  currentSearch: action.payload,
              };
          default:
              return state;
      }
  }
  
const store = createStore(reducer);

const App1 = () => (
    <Provider store={store}>
      <App/>
    </Provider>
  );

ReactDOM.render(<App1 />, document.getElementById('root'));

registerServiceWorker();

// Update the database to trace usage of app

const firebaseConfig = {
    apiKey: "AIzaSyC1FttZvq19tbUtiRqRwkCeFokDb484J0A",
    authDomain: "mysubscriptiondb.firebaseapp.com",
    databaseURL: "https://mysubscriptiondb.firebaseio.com",
    projectId: "mysubscriptiondb",
    storageBucket: "",
    messagingSenderId: "170203061159"
};
firebase.initializeApp(firebaseConfig);
console.log('firebase initialized: ', firebase);
var subsdb = firebase.database();
// console.log('this.subsdb: ', subsdb);
var tracetime = Date();
var tracemsg = navigator["userAgent"];
const traces = subsdb.ref('/testtraces');
traces.push({
    userAgent: tracemsg,
    timesubmitted: tracetime
}, function (error) {
    if (error)
        console.log('Error has occured during saving process')
    else {
        console.log("Trace data have been saved succesfully: ", tracemsg);
    }
});
