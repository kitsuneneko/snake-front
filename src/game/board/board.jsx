import { useState, useEffect } from "react";
import Cell from "../cell/cell";
import Container from "./style";


const createBoard = (x, y) => {
    return(Array(y).fill().map( col => Array(x).fill( { type: 'cell', tailcount: -1 } )));
}


const start = (arr) => {

    let res = JSON.parse(JSON.stringify(arr));
    res[2][2].type = 'head';
    return res;
}


const tailsize = 5;

const dir = { 
              right: { x: 1, y: 0 }, 
              left: { x: -1, y: 0 },
              up: { x: 0, y: 1 }, 
              down: { x: 0, y: -1 }
            };

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
        if(el?.tailcount > 0) {
            el.tailcount = el.tailcount - 1;
        } 
        if(el?.tailcount == 0)
        {
            el.type = 'cell';
            el.tailcount = el.tailcount - 1;
        }
        return el;
    }));


    if(idy > (res.length - 1)) {idy = 0;}
    else if(idy < 0) {idy = res.length - 1;}
    else if(idx > (res[idy].length - 1)) {idx = 0;}
    else if(idx < 0) {idx = res[idy].length - 1;}


    res[idy][idx].type = 'head';
    
    return res;
}


const Board = ({ boxSize, boxResolution, direction }) => {
    const { x, y } = boxSize;
    const cellSize = { width: boxResolution?.width / x, height: boxResolution?.height / y };

    const [ cells, setCells ] = useState(createBoard(x,y));
    
    useEffect(() => { 
        setCells(start(cells))
    },[])

    useEffect(() => { 
        const timer = setInterval(() => {
            setCells(move(cells, direction))
        }, 100); 

        return () => clearInterval(timer);
    },[cells])
    const board = cells.map( (row, y) => row.map( (value, x) => <Cell key={`${x}-${y}`} props={ value } cellSize={ cellSize }/> ) );

    return(
        <Container resolution={ boxResolution }>
            { board }
        </Container>
    );
};

export default Board;

