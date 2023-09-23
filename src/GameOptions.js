import React from 'react';
import './Appes.css'; 

const GameOptions = (props) => {
  return (
    <div className="game-options">
      <img
        src={props.rockImage}
        alt="Rock"
        onClick={() => props.onOptionSelect('rock')}
        className="rotate" 
      />
      <img
        src={props.paperImage}
        alt="Paper"
        onClick={() => props.onOptionSelect('paper')}
        className="red-background" 
           />
      <img
        src={props.scissorsImage}
        alt="Scissors"
        onClick={() => props.onOptionSelect('scissors')}
        className="flash" 
      />
    </div>
  );
};

export default GameOptions;

  
