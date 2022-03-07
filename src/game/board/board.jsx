import { useState, useEffect } from "react";
import Cell from "../cell/cell";
import Container from "./style";


const createBoard = (x, y) => {
    return(Array(y).fill().map( col => Array(x).fill( { type: 'cell' } )));
}


const start = (arr) => {

    let res = JSON.parse(JSON.stringify(arr));
    res[0][0] = { type: 'head' };
    return res;
}

const move = (arr) => {

    let res = JSON.parse(JSON.stringify(arr));
    console.log(res);
    let idx = 0, idy = 0;
    res.map( (row, y) => row.map( (el, x) => { 
        if(el?.type == 'head') {
            idx = x;
            idy = y;
        } 
    }));

    res[idy][idx] = { type: 'cell' };
    if(idx > 8) {idx = -1;}
    res[idy][++idx] = { type: 'head'};
    console.log(idx,idy);
    
    return res;
}


const Board = ({ x = 10, y = 10 }) => {
    const [ cells, setCells ] = useState(createBoard(x,y));

    // console.log(cells);

    useEffect(() => { setCells(start(cells))
    },[])

    useEffect(() => { 
        const timer = setInterval(() => {
            setCells(move(cells))
        }, 10); 

        return () => clearInterval(timer);
    },[cells])
    const board = cells.map( (row, y) => row.map( (value, x) => <Cell key={`${x}-${y}`} props={ value }/> ) );

    return(
        <Container>
            { board }
        </Container>
    );
};

export default Board;

