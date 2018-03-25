import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import HomePage from './HomePage';
import FloorPage from './FloorPage';
import SearchPage from './SearchPage';

class App extends React.Component {

  render() {
    console.log("App.render called. Currentpage: ", this.props.currentPage, " Current mask: ", this.props.currentMask, " Current search: ", this.props.currentSearch);
    return (
      <div className="App">
        <div className='container'>
          {this.props.currentPage === "home" && <HomePage />}  
          {this.props.currentPage === "floor" && <FloorPage />}
          {this.props.currentPage === "search" && <SearchPage />}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentPage: state.currentPage,
    currentMask: state.currentMask,
    currentSearch: state.currentSearch,
    members: state.members
    
  };
}

export default connect(mapStateToProps)(App);


