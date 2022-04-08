import { useState, useEffect } from "react";
import Cell from "../cell/cell";
import Container from "./style";



const createBoard = (x, y) => {
    return(Array(y).fill().map( col => Array(x).fill( { type: 'cell', tailcount: 0 } )));
}

const setTimer = () => Math.floor(Math.random() * ( 60 - 15 )) + 15;

const dir = { 
    right: { x: 1, y: 0 }, 
    left: { x: -1, y: 0 },
    up: { x: 0, y: 1 }, 
    down: { x: 0, y: -1 },
    pause: { x: 0, y: 0 }
  };

const food = [ 'food', 'rareFood', 'goldenFood' ];


const Board = ({ boxSize, boxResolution, gameState, eventKey, scoreHandler, score, gameStateHandler }) => {
    const { x, y } = boxSize;
    const cellSize = { width: boxResolution?.width / x, height: boxResolution?.height / y };

    const [ direction, setDirection ] = useState('right');
    const [ cells, setCells ] = useState(createBoard(x,y));
    const [ head, setHead ] = useState({ x: 2, y: 2 });
    const [ tailsize, setTailsize ] = useState(5);
    const [ foodTimer, setFoodTimer ] = useState(setTimer());

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

      console.log('eventKey:', eventKey);
      console.log('diir:', direction);
      const checkNewDirection = () => {
          const newDir = defEvent(eventKey);
          if (newDir !== undefined) 
          {
            const { x: oldX, y: oldY } = dir?.[direction];
            const { x: newX, y: newY } = dir?.[newDir];
            if(((oldX + newX === 0) && (oldY + newY === 0))) { console.log('op') }
            else { setDirection(newDir); }
          }
      }
    
    const start = (arr) => {
    
        let res = JSON.parse(JSON.stringify(arr));
        // res[2][2].type = 'head';
        res[head.y][head.x].type = 'head';
        return res;
    }
    
    
    const makeFood = (arr, sizeX = x, sizeY = y) => {
        let res = JSON.parse(JSON.stringify(arr));
        // res[6][6].type = 'food';
        const [ x , y ] = [Math.floor(Math.random() * sizeX), Math.floor(Math.random() * sizeY)]
        if( res[y][x].type !== 'head' || res[y][x].type !== 'tail'){
            res[y][x].type = food[Math.floor(Math.random() * food.length)];
        }
        
        return res;
    
    }
    

    const move = (arr, direction) => {

        let res = JSON.parse(JSON.stringify(arr));
        let { x: idx, y: idy } = dir?.[direction];
        // let idx = 1, idy = 0;
        console.log(dir?.[direction]);
        // res = res.map( (row, y) => row.map( (el, x) => { 
        //     if(el?.type == 'head') {
        //         idx += x;
        //         idy += y;
        //         // el = { type: 'tail', tailcount: tailsize};
        //         el.type = 'tail';
        //         el.tailcount = tailsize;
        //     } 
        //     return el;
        // }));

        
            idx += head.x;
            idy += head.y;
            // el = { type: 'tail', tailcount: tailsize};
            res[head.y][head.x].type = 'tail';
            res[head.y][head.x].tailcount = tailsize;
        
    
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
            setTailsize(tailsize + 4);
            scoreHandler(score => score + 10);
        }
        else if(res[idy][idx].type == 'rareFood'){
            setTailsize(tailsize + 2);
            scoreHandler(score => score + 5);
        }
        else if(res[idy][idx].type == 'food'){
            setTailsize(tailsize + 1);
            scoreHandler(score => score + 1);
        }
    
    
    //check gameover
        if(res[idy][idx].type == 'tail') { 
            gameStateHandler('gameover');
        }



        res[idy][idx].type = 'head';
        setHead({ x: idx, y: idy });

    //create food
        if(foodTimer === 0){
            res = makeFood(res, x, y);
            setFoodTimer(setTimer());
        }
        else { 
            setFoodTimer( foodTimer - 1 );
            console.log('Food', foodTimer);
        }
    
    
        return res;
    }
    
    console.log('Score:',score)

    useEffect(() => { 
        if(gameState == 'newgame'){
            // setCells(createBoard(x,y));
            setCells(start(makeFood(createBoard(x,y))));
            setTailsize(5);
        }
    },[gameState])

    // useEffect(() => { if(gameState == 'play') { checkNewDirection() } }, [eventKey])

    useEffect(() => { 
        if(gameState === 'play'){

            const timer = setTimeout(() => {
                    checkNewDirection();
                    console.log('direction', direction);
                    setCells(move(cells, direction));
            }, (800 - score * 50)); 

            return () =>  clearTimeout(timer);
        }
    },[cells, gameState])

    const board = cells.map( (row, y) => row.map( (value, x) => <Cell key={`${x}-${y}`} props={ value } cellSize={ cellSize }/> ) );

    

    return(
        <Container resolution={ boxResolution }>
            { board }
        </Container>
    );
};

export default Board;