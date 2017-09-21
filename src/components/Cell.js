import React from 'react';
import Radium from 'radium';

class Cell extends React.Component {
  constructor(props) {
    super(props);

    this.cellNum = this.props.cellNum;
    this.handleClick = this.props.handleClick;
  }
  render() {
    const gameStatus = this.props.gameStatus;
    const cellInfo = this.props.cellInfo;
    let cellStyle = {
      margin: '1%',
      height: '125px',
      width: '30%',
      border: '1px solid #eee',
      transition: '.5s'
    }
    if (gameStatus === 'playing') {
      cellStyle.cursor = 'pointer';
      cellStyle.border = '1px solid blue';
      cellStyle.boxShadow = '2px 2px 0 darkblue';
      cellStyle[':hover'] = {
        backgroundColor: 'aqua'
      }
    }
    if (cellInfo.isWinningCell) {
      cellStyle.backgroundColor = 'aqua';
      cellStyle.border = '1px solid blue';
      cellStyle.boxShadow = '2px 2px 0 darkblue';
    }

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