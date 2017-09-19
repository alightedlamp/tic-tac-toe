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
      currentPlayer: '',
      gameState: 'idle'
    }

    this.checkForWinner = this.checkForWinner.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.switchGameState = this.switchGameState.bind(this);
    this.endGame = this.endGame.bind(this);
    this.reset = this.reset.bind(this);
  }
  checkForWinner(currentPlayer) {
    for (let i = 0; i < winners.length; i++) {

    }
    // Compare current board against winners
    // If current player has a winning hand, show end state
  }
  handleClick(tile) {
    const marker = this.state.currentPlayer;
    const gameBoard = {...this.state.gameBoard};
    gameBoard[tile] = marker;

    // Check or a winner with new game board and current player
    this.checkForWinner(this.state.currentPlayer, gameBoard);

    // Switch players
    let currentPlayer;
    if (this.state.gameState === 'playing') {
      currentPlayer = marker === 'X' ? 'O' : 'X';
    }

    this.setState({
      gameBoard,
      currentPlayer
    });
  }
  switchGameState(text) {
    const playerChoice = text || null;

    switch (this.state.gameState) {
      case ('idle'):
        this.setState({ gameState: 'starting' });
        break;
      case ('starting'):
        this.setState({
          gameState: 'playing',
          currentPlayer: playerChoice
        });
        break;
      default:
        // Something went wrong, go back to idle state
        console.log('Starting game failed!');
        this.setState({ gameState: 'idle' });
        break;
    }
  }
  endGame(currentPlayer) {
    // Show an animation or strike through winning combo
    // Replace New Game button
  }
  reset() {
    this.setState({
      gameBoard,
      currentPlayer: '',
      gameState: 'idle'
     });
  }
  render() {
    const buttonStyle = {
      padding: '1em',
      border: '1px solid blue',
      backgroundColor: 'blue',
      color: 'white',

      ':hover': {
        border: '1px solid darkblue',
        boxShadow: '3px 3px 0 darkblue',
        backgroundColor: 'white',
        color: 'darkblue',
        transition: '.2s'
      }
    }
    let choiceButtonStyle = {...buttonStyle};
    // choiceButtonStyle['width'] = '100px';

    let info = '';
    let gameState = '';
    let newGameButton = <Button text="New Game" style={buttonStyle} action={this.switchGameState} />;
    let playerChoiceButtons = <div className="player-choice"><Button text="X" style={choiceButtonStyle} action={this.switchGameState} /><Button text="O" style={choiceButtonStyle} action={this.switchGameState} /></div>;

    switch(this.state.gameState) {
      case ('idle'):
        gameState = newGameButton;
        info = 'Let\'s play a game!';
        break;
      case ('starting'):
        gameState = playerChoiceButtons;
        info = 'Which do you want to be?';
        break;
      case ('playing'):
        gameState = `Current Player: ${this.state.currentPlayer}`;
        break;
      case ('finished'):
        info = `${this.state.currentPlayer} wins! Play again?`;
        gameState = newGameButton;
      default:
        gameState = newGameButton;
        break;
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
        <div className="info-bar">
          {info}
        </div>
        <div className="controls">
          {gameState}
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
