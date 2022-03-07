import { useState } from "react";
import Board from "./board/board";

function Game() {
  const boxResolution = { width: `1000px`, height: `1000px`};
  const boxSize = { x: 20, y: 20 };


  


  return (
    <div className="game">
      <div className="game-board">
        <Board boxResolution={ boxResolution } boxSize={ boxSize }/>
      </div>
    </div>
  );
}

export default Game;
