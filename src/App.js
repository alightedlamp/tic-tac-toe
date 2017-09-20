import React, { Component } from 'react';
import './css/styles.css';
import { game, winners, getRandomInt } from './helpers';

import Cell from './components/Cell';
import Button from './components/Button';

class App extends Component {
  constructor() {
    super();

    this.state = {
      game: game,
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
  checkForWinner(player, game) {
    // Iterate `game` and build array with matching cell numbers
    const cells = game.filter(cell => cell.player === player)
                      .map(cell => cell.cell);
    // Compare current board against winners
    // If current player has a winning hand, show end state
  }
  handleClick(cell) {
    let game = [...this.state.game];
    let player = this.state.player;
    game[cell].player = player;

    // Check or a winner with new game board and current player
    this.checkForWinner(player, game);

    player = player === 'X' ? 'O' : 'X';
    this.setState({
      game,
      player
    });

    // Let the computer play a round
    if (this.state.gameStatus === 'playing' && this.state.players === 1) {
      this.playComputerRound(player, game);
    }
  }
  playComputerRound(player, game) {
    // Determine if board is full
    const boardFull = game.filter(cell => cell.player).length === 9;
    if (boardFull) {
      this.endGame();
    }
    else {
      let cell = getRandomInt();
      while (game[cell].player.length) {
        cell = getRandomInt();
      }
      game[cell].player = player;

      // See if the computer is a winner
      this.checkForWinner(player, game);

      player = player === 'X' ? 'O' : 'X';
      this.setState({
        game,
        player
      });
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
      default:
        // Something went wrong, go back to idle state
        console.error('Starting game failed!');
        this.setState({ gameStatus: 'idle' });
        break;
    }
  }
  endGame(player) {
    // Handle if board is full and no winner
    // If winner, change button style of winning cells
    // Replace New Game button
    this.setState({
      gameStatus: 'finished'
    });
  }
  reset() {
    // Board is not resetting since data structure refactor
    const game = game;
    this.setState({
      game,
      player: '',
      gameStatus: 'idle'
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
        gameStatus = newGameButton;
        break;
    }

    return (
      <div className="App">
        <h1 className="title">Tic Tac Toe</h1>
        <div className="game-board">
          {this.state.game
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
