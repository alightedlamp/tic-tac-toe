import React from 'react';

import Button from './Button';

class InfoBar extends React.Component {
  render() {
    const gameStatus = this.props.gameStatus;
    const player = this.props.player;
    const switchGameState = this.props.switchGameState;
    const reset = this.props.reset;

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

    let info = '';
    let option = '';
    let newGameButton = <Button text="New Game" style={buttonStyle} action={switchGameState} />;
    let playerChoiceButtons = (
      <div className="player-choice">
        <Button text="X" style={buttonStyle} action={switchGameState} />
        <Button text="O" style={buttonStyle} action={switchGameState} />
      </div>
      )

    switch(gameStatus) {
      case ('idle'):
        option = newGameButton;
        info = 'Let\'s play a game!';
        break;
      case ('starting'):
        option = playerChoiceButtons;
        info = 'Which do you want to be?';
        break;
      case ('playing'):
        info = `Current Player: ${player}`;
        break;
      case ('finished'):
        info = `${player} wins! Play again?`;
        option = newGameButton;
        break;
      default:
        info = 'Error in application!';
        break;
    }

    return(
      <div>
        <div className="info-bar">
          {info}
        </div>
        <div className="controls">
          <Button
            text="Reset"
            style={buttonStyle}
            action={reset}
          />
          {option}
        </div>
      </div>
      )
  }
}

export default InfoBar;