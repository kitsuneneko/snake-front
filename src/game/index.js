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
  const [ gameState, setGameState ] = useState('pause');
  const [ eventKey, setEventKey ] = useState();
  const [ score, setScore ] = useState(0);


  const promise = async (url) => {
    const data = await fetch(url)
    .then((res) => {
      return res.json();
    }).catch(err=>console.log(err));

    if(data !== undefined)
      setLeaderboardData(data);
  };

  const data = { player: 'example', score: 300 };
  const postreq = async () => {
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

  }, [gameState])

  const url = '/leaderboard';

  useEffect(() => {
    promise(url);
    postreq();
  },[])



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
      else if( ((eventKey == 'Escape' && gameState == 'pause') || ( defEvent(eventKey) != undefined )) && (gameState !== 'gameover') ) { setGameState('play') }
      // if ( defEvent(eventKey) != undefined ) { 
      //   setDirection(defEvent(eventKey))
      // }
      console.log(eventKey, gameState);


  },[eventKey, gameState]);


  
  // useEffect(()=> document.addEventListener('keydown', (event) => {
  //   const timer = setTimeout(() => {
  //     let key = event.key;
  //     if( key == 'Escape' ) { setGameState('pause') }
  //     else if( key == 'Escape' && gameState == 'pause' ) { setGameState('play') }
  //     else if ( defEvent(key) != undefined ) { 
  //       setDirection(defEvent(key))
  //       console.log('!!');
  //     }
  //     console.log(key, gameState);
  //   }, 0)

  //   return () => clearTimeout(timer);

  // }),[]);


  const scoreHandler = (score) => {
     setScore(score);
  };

  const gameStateHandler = (gameState) => {
    setGameState(gameState);
  };

  const Info = () => {
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
