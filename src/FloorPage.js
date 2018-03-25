import React from 'react';
import { connect } from 'react-redux';
import logga from './logga.png';

class FloorPage extends React.Component {
  render() {
    
      // compute header (text under picture)
      var floor, trappor, gata, plan;
      var spaces = <span>&emsp; &emsp; &emsp;</span>;
      if (this.props.currentMask > 20) {
          floor = this.props.currentMask - 21;
          if (floor === 1) {trappor=" trappa"} else {trappor=" trappor"};
          gata = 'Taxgatan 3'
          plan = floor.toString() + trappor;
      } else {
          floor = this.props.currentMask - 11;
          if (floor === 1) {trappor=" trappa"} else {trappor=" trappor"};
          gata = 'Taxgatan 7'
          plan = floor.toString() + trappor;
         
      }

      // make hits = members with right mask
      var hits = [];
      var i, j = 0;
      for (i = 0; i < this.props.members.length; i++) {
          if (this.props.members[i].lgh.substring(0, 2) === this.props.currentMask.toString()) {
              hits[j] = this.props.members[i];
              j++
          }
      }
      // Insert empty row when lgh changes
      var hits2 = [];
      var oldlgh = hits[0].lgh;
      j = 0;
      for (i = 0; i < hits.length; i++) {
        if (hits[i].lgh !== oldlgh) {
          hits2[j] = [];
          j++;
          oldlgh = hits[i].lgh
        };
        hits2[j] = hits[i];
        j++;
      };
      j = 0;
      const listItems = hits2.map((member) =>
        <tr key={j++}>
          <td>{member.lgh}</td>
          <td>{member.lmv}</td>
          <td>{member.membername}</td>
        </tr>
      );

      return ([
            (<div className='header1' key="header1">
            <img src={logga} alt={"logga"} className="centerImage"/>
              <p>{gata} {spaces} {plan}</p>
            </div>),
            (<div className="memberList" key="floorresults" >
                <table><tbody>{listItems}</tbody></table>
            </div>),
            (<div className="footer2" key="footer2">
            <button className="StdButton BottomButton SmallButton" onClick={() => {this.goUp()}}>Upp</button>
            <button className="StdButton BottomButton SmallButton" onClick={() => {this.goDown()}}>Ner</button>
            <button className="StdButton BottomButton SmallButton" onClick={() => {this.gotoHome()}}>Tillbaks</button>
          </div>)
        ]);
    }
    goUp = () => {
      console.log('goUp called');
      this.props.dispatch({ type: 'GOUP' });
    }
    goDown = () => {
      console.log('goDown called');
      this.props.dispatch({ type: 'GODOWN' });
    }
    gotoHome = () => {
      console.log('gotoHome called');
      this.props.dispatch({ type: 'GOTOHOME' });
    }
  }

function mapStateToProps(state) {
    return {
    
      currentMask: state.currentMask,
      members: state.members
    };
  }


 export default connect(mapStateToProps)(FloorPage); 
