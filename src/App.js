import React, { Component } from 'react';
import './css/styles.css';
import { gameBoard, winners } from './helpers';

import Cell from './components/Cell';
import Button from './components/Button';

class App extends Component {
  constructor() {
    super();

    this.state = {
      gameBoard: gameBoard,
      currentPlayer: 0
    }

    this.checkForWinner = this.checkForWinner.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.startGame = this.startGame.bind(this);
    this.endGame = this.endGame.bind(this);
    this.reset = this.reset.bind(this);
  }
  checkForWinner(currentPlayer) {
    // Compare current board against winners
    // If current player has a winning hand, show end state
  }
  handleClick(tile) {
    const marker = this.state.currentPlayer ? 'X' : 'O';
    const gameBoard = {...this.state.gameBoard};
    gameBoard[tile] = marker;

    // Check or a winner with new game board and current player
    this.checkForWinner(currentPlayer, gameBoard);

    // Switch players
    const currentPlayer = !this.state.currentPlayer;
    this.setState({
      gameBoard,
      currentPlayer
    });
  }
  startGame() {
    // Flip a coin and pick a player to start
    // Replace button with current player text
  }
  endGame(currentPlayer) {
    // Show an animation or strike through winning combo
    // Replace New Game button
  }
  reset() {
    // Reset board and show New Game button
  }
  render() {
    const currentPlayer = this.state.currentPlayer ? 'X' : 'O';
    const buttonStyle = {
      padding: '1em',
      border: '0',
      backgroundColor: 'blue',
      color: 'white',

      ':hover': {
        border: '1px solid darkblue',
        boxShadow: '3px 3px 0 darkblue',
        textShadow: 'none',
        backgroundColor: 'white',
        color: 'darkblue',
        transition: '.2s'
      }
    }

    return (
      <div className="App">
        <h1 className="title">Tic Tac Toe</h1>
        <div className="game-board">
          {Object.keys(this.state.gameBoard)
            .map((cell, i) => {
              return <Cell
                {...this.state}
                tileNum={i + 1}
                key={i}
                handleClick={this.handleClick}
              />
            })
          }
        </div>
        <div className="controls">
          <div className="game-state">
            Current player: {currentPlayer}
          </div>
          <Button
            text="Reset"
            style={buttonStyle}
            action={this.reset}
          />
        </div>
      </div>
    );
  }
}

export default App;
