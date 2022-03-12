import { useState, useEffect } from "react";
import Cell from "../cell/cell";
import Container from "./style";



const createBoard = (x, y) => {
    return(Array(y).fill().map( col => Array(x).fill( { type: 'cell', tailcount: 0 } )));
}

const dir = { 
    right: { x: 1, y: 0 }, 
    left: { x: -1, y: 0 },
    up: { x: 0, y: 1 }, 
    down: { x: 0, y: -1 },
    pause: { x: 0, y: 0 }
  };


const Board = ({ boxSize, boxResolution, gameState, eventKey, scoreHandler, gameStateHandler }) => {
    const { x, y } = boxSize;
    const cellSize = { width: boxResolution?.width / x, height: boxResolution?.height / y };

    const [ direction, setDirection ] = useState('right');
    const [ cells, setCells ] = useState(createBoard(x,y));
    const [ score, setScore ] = useState(0);
    const [ tailsize, setTailsize ] = useState(5);

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

      const checkNewDirection = () => {
          const newDir = defEvent(eventKey);
          const { x: oldX, y: oldY } = dir?.[direction];
          const { x: newX, y: newY } = dir?.[newDir];
          if(((oldX + newX === 0) && (oldY + newY === 0)) || (newDir === undefined)) { console.log('op') }
          else { setDirection(newDir); }
      }
    
    const start = (arr) => {
    
        let res = JSON.parse(JSON.stringify(arr));
        res[2][2].type = 'head';
        return res;
    }
    
    
    const makeFood = (arr, sizeX, sizeY) => {
        let res = JSON.parse(JSON.stringify(arr));
        // res[6][6].type = 'food';
        const [ x , y ] = [Math.floor(Math.random() * sizeX), Math.floor(Math.random() * sizeY)]
        if( res[y][x].type !== 'head' || res[y][x].type !== 'tail'){
            res[y][x].type = 'goldenFood';
        }
        
        return res;
    
    }
    

    const move = (arr, direction) => {

        let res = JSON.parse(JSON.stringify(arr));
        let { x: idx, y: idy } = dir?.[direction];
        // let idx = 1, idy = 0;
        console.log(dir?.[direction]);
        res = res.map( (row, y) => row.map( (el, x) => { 
            if(el?.type == 'head') {
                idx += x;
                idy += y;
                el = { type: 'tail', tailcount: tailsize};
            } 
            return el;
        }));
    
        res = res.map( (row, y) => row.map( (el, x) => { 
            if(el?.tailcount > 1) {
                el.tailcount = el.tailcount - 1;
            } 
            else if(el?.tailcount == 1)
            {
                el.type = 'cell';
                el.tailcount = el.tailcount - 1;
            }
            return el;
        }));
    
    // check border
        if(idy > (res.length - 1)) {idy = 0;}
        else if(idy < 0) {idy = res.length - 1;}
        else if(idx > (res[idy].length - 1)) {idx = 0;}
        else if(idx < 0) {idx = res[idy].length - 1;}
    

    // check food
        if(res[idy][idx].type == 'goldenFood'){
            setTailsize(tailsize + 1);
            setScore(score + 10);
            scoreHandler(score);
        }
    
    
    //check gameover
        if(res[idy][idx].type == 'tail') { 
            gameStateHandler('gameover');
        }



        res[idy][idx].type = 'head';


        if(Math.random() > 0.99){
            res = makeFood(res, x, y);
            
        }
        console.log(Math.random())
    
    
        return res;
    }
    
    console.log('Score:',score)

    useEffect(() => { 
        setCells(start(makeFood(cells, x, y)))

        // setInterval(() => {
        //     makeFood(cells, x, y)
        // }, 10000);

    },[])
    const req = true;

    useEffect(() => { 
        if(gameState === 'play'){

            const timer = setTimeout(() => {
                    checkNewDirection();
                    console.log('direction', direction);
                    setCells(move(cells, direction));
            }, 100); 

            return () =>  clearTimeout(timer);
        }
        else if(gameState === 'gameover') {
            start(cells);
        }
    },[cells, gameState])

    // useEffect(() => { 
    //     const timer = setInterval(() => {
    //         setCells(makeFood(cells, x, y))
    //     }, 1000); 

    //     return () => clearInterval(timer);
    // },[cells])


    const board = cells.map( (row, y) => row.map( (value, x) => <Cell key={`${x}-${y}`} props={ value } cellSize={ cellSize }/> ) );

    

    return(
        <Container resolution={ boxResolution }>
            { board }
        </Container>
    );
};

export default Board;