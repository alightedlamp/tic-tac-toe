import React from 'react';
import Radium from 'radium';

class Cell extends React.Component {
  constructor(props) {
    super(props);

    this.cellNum = this.props.cellNum;
    this.handleClick = this.props.handleClick;
  }
  render() {
    const cellStyle = {
      margin: '1%',
      height: '125px',
      width: '30%',
      border: '1px solid blue',
      boxShadow: '2px 2px 0 darkblue',

      ':hover': {
        backgroundColor: 'aqua',
        transition: '.5s'
      }
    }
    const cellInfo = this.props.cellInfo;
    const currentPlayer = this.props.currentPlayer;

    return (
      <div className="cell" onClick={() => this.handleClick(this.cellNum)} style={cellStyle}>
        <div className="marker">
          {cellInfo.player}
        </div>
      </div>
    );
  }
}

export default Radium(Cell);