import { useState, useEffect } from "react";
import Cell from "../cell/cell";
import Container from "./style";




// const start = (x, y) => {
//     return(Array(x * y).fill({ head: false, tail: false, food: false }));
// }

// const createBoard = (x, y) => {
//     return(Array(x * y).fill({ celltype: "blank" }));
// }

const createBoard = (x, y) => {
    return(Array(y).fill().map( col => Array(x).fill( { type: 'cell' } )));
}

// const createBoard = (x, y) => {
//     return(JSON.parse(JSON.stringify(Array(y).fill(Array(x).fill({type: "cell"})))));
// }

// const createBoard = (x, y) => {
//     return(JSON.parse(JSON.stringify(Array(y).fill().map( ob => Array(x).fill({type: "cell"})))));
// }

const start = (arr) => {

    // let res = arr.map( item => item );
    let res = JSON.parse(JSON.stringify(arr));
    res[0][0] = { type: 'head' };
    return res;
}


const Board = ({ x = 10, y = 10 }) => {


    const newCells = createBoard(x,y);
    const [ cells, setCells ] = useState(newCells);

    const startCells = start(newCells);
    console.log(startCells[0][0]);
    
    console.log(newCells[0][0]);

    console.log(cells);

    useEffect(() => { setCells(start(cells))
    },[])


    const board = cells.map( (cell, y) => cell.map( (celltype, x) => <Cell key={`${x}-${y}`} props={ celltype }/> ) );

    return(
        <Container>
            { board }
        </Container>
    );
};

export default Board;

