import React from 'react';
import { connect } from 'react-redux';
import logga from './logga.png';

class HomePage extends React.Component {
    render() {
      return (
        [
        (<div className='header1' key="header1">
        <img src={logga} alt={"logga"} className="centerImage"/>
          <p>Brf Husarvikens Strand</p>
        </div>),

        (<div className='bluehouse' key='bluehouse'>
        <p>Taxgatan 3</p>
        <button className="StdButton" onClick={() => {this.show(28)}}>7 trappor</button>
        <button className="StdButton" onClick={() => {this.show(27)}}>6 trappor</button>
        <button className="StdButton" onClick={() => {this.show(26)}}>5 trappor</button>
        <button className="StdButton" onClick={() => {this.show(25)}}>4 trappor</button>
        <button className="StdButton" onClick={() => {this.show(24)}}>3 trappor</button>
        <button className="StdButton" onClick={() => {this.show(23)}}>2 trappor</button>
        <button className="StdButton" onClick={() => {this.show(22)}}>1 trappa</button>
        </div>),
        
        (<div className='redhouse' key='redhouse'>
        <p>Taxgatan 7</p>
        <button className="StdButton" onClick={() => {this.show(17)}}>6 trappor</button>
        <button className="StdButton" onClick={() => {this.show(16)}}>5 trappor</button>
        <button className="StdButton" onClick={() => {this.show(15)}}>4 trappor</button>
        <button className="StdButton" onClick={() => {this.show(14)}}>3 trappor</button>
        <button className="StdButton" onClick={() => {this.show(13)}}>2 trappor</button>
        <button className="StdButton" onClick={() => {this.show(12)}}>1 trappa</button>
        </div>),
        (<div className="footer1" key="footer1">
        <button className="StdButton BottomButton" onClick={() => {this.gotoSearch()}}>Sök på namn eller lgh-nummer</button>
        <p className="footnote"> Version 4.0 &emsp; &emsp; &emsp; 2018-03-24 </p>
        </div>)
        ]
      )
    }
    show(mask) {
      console.log('HomePage show called with mask=', mask);
      this.props.dispatch({ type: 'GOTOFLOOR', payload: mask }); 
      
    }
    gotoSearch = () => {
      this.props.dispatch({ type: 'GOTOSEARCH' });
    }
  }

function mapStateToProps(state) {
    return {
      
    };
  }

 export default connect(mapStateToProps)(HomePage); 
