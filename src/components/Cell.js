import React from 'react';

export default class Cell extends React.Component {
  constructor(props) {
    super(props);

    this.tileNum = this.props.tileNum;
    this.handleClick = this.props.handleClick;
  }
  render() {
    const gameBoard = this.props.gameBoard;
    const currentPlayer = this.props.currentPlayer;

    return (
      <div className="cell" onClick={() => this.handleClick(this.tileNum)}>
        <div className="marker">
          {gameBoard[this.tileNum]}
        </div>
      </div>
    );
  }
}
