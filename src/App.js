import React, { Component } from 'react';
import './css/styles.css';
import { defaultBoard, winners, getRandomInt } from './helpers';

import Cell from './components/Cell';
import Button from './components/Button';

class App extends Component {
  constructor() {
    super();

    this.state = {
      board: defaultBoard,
      player: '',
      gameStatus: 'idle',
      players: 1
    }

    this.checkForWinner = this.checkForWinner.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.switchGameState = this.switchGameState.bind(this);
    this.endGame = this.endGame.bind(this);
    this.reset = this.reset.bind(this);
  }
  checkForWinner(player, current) {
    // Iterate `game` and build array with matching cell numbers
    const cells = current.filter(cell => cell.player === player)
                         .map(cell => cell.cell);
    // Compare current board against winners
    const isWinner = winners.filter(seq => {
      const [a, b, c] = seq;
      if (cells.indexOf(a) >= 0 && cells.indexOf(b) >= 0 && cells.indexOf(c) >= 0) {
        current[a - 1].isWinningCell = true;
        current[b - 1].isWinningCell = true;
        current[c - 1].isWinningCell = true;
        return true;
      }
    });
    if (isWinner.length > 0) {
      this.setState({ current });
      return true;
    }
    else {
      return false;
    }
  }
  handleClick(cell) {
    let current = [...this.state.board];
    let player = this.state.player;
    current[cell].player = player;

    // Check or a winner with new game board and current player
    if (this.checkForWinner(player, current)) {
      this.endGame(player);
    }
    else {
      player = player === 'X' ? 'O' : 'X';
      this.setState({
        current,
        player
      });

      // Let the computer play a round
      if (this.state.gameStatus === 'playing' && this.state.players === 1) {
        setTimeout(function() {
          this.playComputerRound(player, current)
        }.bind(this), 1000);
      }
    }
  }
  playComputerRound(player, current) {
    // Determine if board is full
    const boardFull = current.filter(cell => cell.player).length === 9;
    if (boardFull) {
      this.endGame();
    }
    else {
      let cell = getRandomInt();
      while (current[cell].player.length) {
        cell = getRandomInt();
      }
      current[cell].player = player;

      // See if the computer is a winner
      if (this.checkForWinner(player, current)) {
        this.endGame(player);
      }
      else {
        player = player === 'X' ? 'O' : 'X';
        this.setState({
          current,
          player
        });
      }
    }
  }
  switchGameState(text) {
    const playerChoice = text || null;

    switch (this.state.gameStatus) {
      case ('idle'):
        this.setState({ gameStatus: 'starting' });
        break;
      case ('starting'):
        this.setState({
          gameStatus: 'playing',
          player: playerChoice
        });
        break;
      case ('finished'):
        this.reset();
        break;
      default:
        this.setState({ gameStatus: 'error' });
        break;
    }
  }
  endGame(player, isWinner) {
    // Handle if board is full and no winner
    this.setState({
      gameStatus: 'finished'
    });
  }
  reset() {
    const board = [
      { cell: 1, player: '', isWinningCell: false },
      { cell: 2, player: '', isWinningCell: false },
      { cell: 3, player: '', isWinningCell: false },
      { cell: 4, player: '', isWinningCell: false },
      { cell: 5, player: '', isWinningCell: false },
      { cell: 6, player: '', isWinningCell: false },
      { cell: 7, player: '', isWinningCell: false },
      { cell: 8, player: '', isWinningCell: false },
      { cell: 9, player: '', isWinningCell: false }
    ];
    this.setState({
      board,
      player: '',
      gameStatus: 'starting'
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
    let gameStatus = '';
    let newGameButton = <Button text="New Game" style={buttonStyle} action={this.switchGameState} />;
    let playerChoiceButtons = <div className="player-choice"><Button text="X" style={choiceButtonStyle} action={this.switchGameState} /><Button text="O" style={choiceButtonStyle} action={this.switchGameState} /></div>;

    switch(this.state.gameStatus) {
      case ('idle'):
        gameStatus = newGameButton;
        info = 'Let\'s play a game!';
        break;
      case ('starting'):
        gameStatus = playerChoiceButtons;
        info = 'Which do you want to be?';
        break;
      case ('playing'):
        gameStatus = `Current Player: ${this.state.player}`;
        break;
      case ('finished'):
        info = `${this.state.player} wins! Play again?`;
        gameStatus = newGameButton;
        break;
      default:
        gameStatus = 'Error in application!';
        break;
    }

    return (
      <div className="App">
        <h1 className="title">Tic Tac Toe</h1>
        <div className="game-board">
          {this.state.board
            .map((cell, i) => {
              return <Cell
                cellInfo={cell}
                cellNum={i}
                style={cell.style}
                gameStatus={this.state.gameStatus}
                handleClick={this.handleClick}
                key={i}
              />
            })
          }
        </div>
        <div className="info-bar">
          {info}
        </div>
        <div className="controls">
          <Button
            text="Reset"
            style={buttonStyle}
            action={this.reset}
          />
          {gameStatus}
        </div>
      </div>
    );
  }
}

export default App;
