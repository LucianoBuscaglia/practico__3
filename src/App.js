import React, { Component } from 'react';
import './Appes.css';
import rockImage from './rock.png';
import paperImage from './paper.png';
import scissorsImage from './scissors.png';


const GameOptions = (props) => {
  return (
    <div className="game-options">
      <img
        src={rockImage}
        alt="Rock"
        onClick={() => props.onOptionSelect('rock')}
      />
      <img
        src={paperImage}
        alt="Paper"
        onClick={() => props.onOptionSelect('paper')}
      />
      <img
        src={scissorsImage}
        alt="Scissors"
        onClick={() => props.onOptionSelect('scissors')}
      />
    </div>
  );
};

const ComputerChoice = ({ choice }) => {
  let imagePath;
  if (choice === 'rock') {
    imagePath = process.env.PUBLIC_URL + '/rock.png';
  } else if (choice === 'paper') {
    imagePath = process.env.PUBLIC_URL + '/paper.png';
  } else if (choice === 'scissors') {
    imagePath = process.env.PUBLIC_URL + '/scissors.png';
  }

  return (
    <div>
      <p>Elección de la computadora:</p>
      <img src={imagePath} alt={choice} />
    </div>
  );
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerChoice: null,
      computerChoice: null,
      result: null,
      playerName: '',
      nameEntered: false,
      gameStarted: false,
      playerScore: 0,
      computerScore: 0,
      roundsPlayed: 0,
      totalRounds: 5,
      gameResult: null,
      showPlayAgainButton: false,
    };
  }

  handlePlayerChoice = (choice) => {
    const computerChoiceOptions = ['rock', 'paper', 'scissors'];
    const computerChoice =
      computerChoiceOptions[
        Math.floor(Math.random() * computerChoiceOptions.length)
      ];

    const result = this.determineRoundWinner(choice, computerChoice);

    this.setState({
      playerChoice: choice,
      computerChoice: computerChoice,
      result: result,
    });

    this.setState((prevState) => ({
      roundsPlayed: prevState.roundsPlayed + 1,
    }));

    if (this.state.roundsPlayed === this.state.totalRounds) {
      this.determineGameWinner();
    }
  };

  determineRoundWinner(playerChoice, computerChoice) {
    let playerScore = this.state.playerScore;
    let computerScore = this.state.computerScore;

    if (playerChoice === computerChoice) {
      // Empate
    } else if (
      (playerChoice === 'rock' && computerChoice === 'scissors') ||
      (playerChoice === 'paper' && computerChoice === 'rock') ||
      (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
      // El jugador gana la ronda
      playerScore++;
    } else {
      // El oponente (PC) gana la ronda
      computerScore++;
    }

    this.setState({
      playerScore: playerScore,
      computerScore: computerScore,
    });

    if (playerChoice === computerChoice) {
      return 'Empate';
    } else if (playerScore > computerScore) {
      return 'Ganaste la ronda';
    } else {
      return 'La computadora ganó la ronda';
    }
  }



  determineGameWinner() {
    const playerScore = this.state.playerScore;
    const computerScore = this.state.computerScore;
    
    let gameResult;
    if (playerScore > computerScore) {
      gameResult = <p className="result-message">¡Ganaste el juego!</p>;
    } else if (computerScore > playerScore) {
      gameResult = <p className="result-message1">'La computadora ganó el juego'</p>;
    } else {
      gameResult = 'El juego terminó en empate';
    }

    this.setState({
      gameResult: gameResult,
      gameStarted: false,
      showPlayAgainButton: true,
    });
  }



  handleNameChange = (event) => {
    const playerName = event.target.value;

    // Validar que el nombre contenga solo letras y espacios
    const nameRegex = /^[A-Za-z\s]+$/;

    if (nameRegex.test(playerName) || playerName === '') {
      this.setState({
        playerName: playerName,
        nameEntered: playerName !== '',
      });
    }
  };

  startGame = () => {
    this.setState({
      playerScore: 0,
      computerScore: 0,
      roundsPlayed: 0,
      gameResult: null,
      gameStarted: true,
      showPlayAgainButton: false,
    });
  };

  restartGame = () => {
    this.setState({
      playerChoice: null,
      computerChoice: null,
      result: null,
      playerName: '',
      nameEntered: false,
      gameStarted: false,
      playerScore: 0,
      computerScore: 0,
      roundsPlayed: 0,
      gameResult: null,
      showPlayAgainButton: false,
    });
   };

  render() {
    if (this.state.gameResult) {
      return (
        <div className="container">
          <h1 className="title">JUEGO DE PIEDRA, PAPEL O TIJERA</h1>
          <p>{this.state.gameResult}</p>
          {this.state.showPlayAgainButton && (
            <div className="button-container">
              <button onClick={this.restartGame}>Finalizar Juego</button>
              <button onClick={this.startGame}>Jugar de nuevo</button>
            </div>
          )}
        </div>
      );
    }

    if (!this.state.gameStarted) {
      return (
        <div className="container">
          <h1 className="title">JUEGO DE PIEDRA, PAPEL O TIJERA</h1>
          <form>
            <label>
              Nombre del jugador:
              <input
                type="text"
                value={this.state.playerName}
                onChange={this.handleNameChange}
              />
            </label>
          </form>
          <button
            onClick={this.startGame}
            disabled={!this.state.nameEntered}
            style={{ marginTop: '10px' }}
          >
            Comenzar Juego
          </button>
          {!this.state.nameEntered && (
            <p style={{ color: 'red' }}>Por favor, ingresa un nombre válido.</p>
          )}
        </div>
      );
    }

    return (
      <div className="container">
        <h1 className="title">JUEGO DE PIEDRA, PAPEL O TIJERA</h1>
        <GameOptions onOptionSelect={this.handlePlayerChoice} />
        <div className="Result">
          <p>Elección de {this.state.playerName}: {this.state.playerChoice}</p>
          <ComputerChoice choice={this.state.computerChoice} />
          <div className="result-message">
              <p>Resultado: {this.state.result}</p>
          </div>

        </div>
        <div className="Scores">
          <p>Puntuación de {this.state.playerName}: {this.state.playerScore}</p>
          <p>Puntuación de la computadora: {this.state.computerScore}</p>
        </div>
        <div className="button-container">
          <button onClick={this.restartGame}>Finalizar Juego</button>
        </div>
      </div>
    );
  }
}

export default App;