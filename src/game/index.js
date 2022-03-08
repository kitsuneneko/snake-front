import { useEffect, useState } from "react";
import Board from "./board/board";

function Game() {
  const boxResolution = { width: 900, height: 900};
  const boxSize = { x: 20, y: 20 };
  const [ direction, setDirection ] = useState('right');

  const defEvent = (key) => {
    switch(key) {
      case 'w':
      case 'W':
      case 'ArrowUp': return 'up';
      case 's':
      case 'S':
      case 'ArrowDown': return 'down';
      case 'd':
      case 'D':
      case 'ArrowRight': return 'right';
      case 'a':
      case 'A':
      case 'ArrowLeft': return 'left';
      default: return key;
    };
  };

  
  useEffect(()=> document.addEventListener('keydown', (event) => {
    setDirection(defEvent(event.key));
  }),[])

  return (
    <div className="game">
      <div className="game-board">
        <Board boxResolution={ boxResolution } boxSize={ boxSize } direction={ direction }/>
      </div>
    </div>
  );
}

export default Game;
