import React, { Component } from 'react';
import './css/styles.css';
import { defaultBoard, winners, getRandomInt } from './helpers';

import Cell from './components/Cell';
import InfoBar from './components/InfoBar';
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
      this.setState({ board: current });
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
    // Hard reset because `defaultBoard` for some reason why pulling data from state -- weird
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
        <InfoBar
          player={this.state.player}
          gameStatus={this.state.gameStatus}
          switchGameState={this.switchGameState}
          reset={this.reset}
        />
      </div>
    );
  }
}

export default App;
