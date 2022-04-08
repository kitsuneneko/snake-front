import { useEffect, useState } from "react";
import Board from "./board/board";
import LeaderBoard from "./leaderboard";

const leaderboarddata = [
  { id: 1, nickname: 'a', score: '1000' },
  { id: 2, nickname: 'aa', score: '900' },
  { id: 3, nickname: 'aaa', score: '800' },
  { id: 4, nickname: 'aaaa', score: '770' },
  { id: 5, nickname: 'aaaaa', score: '600' }
];



function Game() {
  const boxResolution = { width: 900, height: 900};
  const boxSize = { x: 15, y: 15 };
  
  const [ leaderboardData, setLeaderboardData ] =  useState(leaderboarddata);
  const [ gameState, setGameState ] = useState('newgame');
  const [ eventKey, setEventKey ] = useState();
  const [ score, setScore ] = useState(0);


  const promise = async (url = '/leaderboard') => {
    const data = await fetch(url)
    .then((res) => {
      return res.json();
    }).catch(err=>console.log(err));

    if(data !== undefined)
      setLeaderboardData(data);
  };

  
  const postreq = async (data = { player: 'example', score: 300}) => {
    const request = await fetch('/gameover', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(res => res.json())
    .catch(err => console.log('errrrr', err));
    return request;
  };

  useEffect(() => {
    if(gameState === 'gameover') {
      const player = prompt('Your nickname', 'player') || 'player';
      postreq({ player, score });
    }
    else if(gameState === 'newgame')
    {
      promise();
      setScore(0);
    }
  }, [gameState])


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
    };
  };

  
  useEffect(()=> document.addEventListener('keydown', (event) => {
    setEventKey(event.key);
    
  }),[]);

  useEffect(()=> {
      if( eventKey == 'Escape' ) { setGameState('pause') }
      else if( ((eventKey == 'Escape' && gameState == 'pause') || ( defEvent(eventKey) != undefined )) && (gameState !== 'gameover') )
       { setGameState('play') }
      else if (gameState == 'gameover' && ['r','R'].includes(eventKey))
      { setGameState('newgame'); }
      console.log(eventKey, gameState);


  },[eventKey, gameState]);


  const scoreHandler = (score) => {
     setScore(score);
  };

  const gameStateHandler = (gameState) => {
    setGameState(gameState);
  };

  const Info = () => {
    let msg = '';
    useEffect(() => {
        if( gameState == 'gameover' )
          { msg = <h1>Press R to start new game</h1>}
        else { msg = <h1>Score: {score}</h1> }
    },[gameState])

    return(
      <div>
        <h1>Score: {score}</h1>
      </div>
    )
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board boxResolution={ boxResolution } boxSize={ boxSize } eventKey={eventKey} gameState={gameState}  scoreHandler={scoreHandler} score={score} gameStateHandler={gameStateHandler}/>
        <Info />
      </div>
      <LeaderBoard leaderboardData={leaderboardData}/>
    </div>
  );
}

export default Game;
