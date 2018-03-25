import React from 'react';
import { connect } from 'react-redux';
import arrow from './assets/icon/if_arrow-right_227601.png';

class SearchPage extends React.Component {
        render() {


                var hits = [];
                hits = this.props.members;
                var val = this.props.currentSearch;
                if (!val) {
                    hits = this.props.members; // cancel cross clicked
                } else {
                    hits = hits.filter((member) => {
                        return (
                            (member.membername.toLowerCase().indexOf(val.toLowerCase()) > -1) ||
                            (member.lgh.toLowerCase().indexOf(val.toLowerCase()) > -1) ||
                            (member.lmv.toLowerCase().indexOf(val.toLowerCase()) > -1)
                        );
                    })
                }
            
                const listItems = hits.map((member) =>
                <tr key={member.membername}>
                <td>{member.lgh}</td>
                <td>{member.lmv}</td>
                <td>{member.membername}</td>
                <td><img src={arrow} alt={member.lgh.substring(0,2)} onClick={(ev) => {this.show(ev)}}/></td>
                </tr>
                );
        
        return ([
            (<div className='header3' key='header3'>
            <p>Brf Husarvikens Strand</p>
            <input onChange={(ev) => {this.findHits(ev)}} type='search' placeholder="Skriv namn eller lgh-nummer"/>
            <p> &emsp; </p>
            </div>),
            (<div className="memberList" key="searchresults" >
                <table><tbody>{listItems}</tbody></table>
            </div>),
            (<div className="footer3" key="footer3">
            <button className="StdButton BottomButton" onClick={() => {this.gotoHome()}}>Tillbaks till startsidan</button>
            </div>)
        ]);
    }

    findHits(ev) { // called on input change
        console.log('findHits called - parameter ', ev.target.value);
        var mask = ev.target.value;
        this.props.dispatch({ type: 'SETSEARCH', payload: mask });
    }

    show(ev) {
        var mask = Number(ev.target.alt);
        console.log('Arrow clicked with mask=', mask);
        this.props.dispatch({ type: 'GOTOFLOOR', payload: mask }); 
        
      }
    
    gotoHome = () => {
      console.log('gotoHome called');
      this.props.dispatch({ type: 'GOTOHOME' });
    }
  }

function mapStateToProps(state) {
    return {
      
      
      currentSearch: state.currentSearch,
      members: state.members
      
    };
  }

 export default connect(mapStateToProps)(SearchPage); 
