import { useState } from "react";
import Cell from "../cell/cell";
import Container from "./style";




// const start = (x, y) => {
//     return(Array(x * y).fill({ head: false, tail: false, food: false }));
// }

// const createBoard = (x, y) => {
//     return(Array(x * y).fill({ celltype: "blank" }));
// }

const createBoard = (x, y) => {
    return(Array(y).fill().map( col => Array(x).fill( { celltype: 'blank' } )));
}


const start = (arr) => {

    // let res = arr.map( item => item );
    let res = [...arr];
    console.log(res);
    res[0][0] = { celltype: 'head' };
    return res;
}


const Board = ({ x = 10, y = 10 }) => {


    const newCells = createBoard(x,y);

    console.log(newCells[0][0]);

    const [ cells, setCells ] = useState(newCells);

    const startGame = start(newCells);

    console.log(startGame[0][0]);
    console.log(newCells[0][0]);






    // const cells = () => {
    //     const elements = [];
    //     for(let yi = 0; yi < y; yi++) {
    //         for(let xi = 0; xi < x; xi++){
    //             elements.push(<Cell key={`${xi}-${yi}`} props={ start(xi, yi) } />);
    //         }
    //     }
    //     console.log(elements);
    //     return elements;
    // };

    const board = cells.map( (cell, y) => cell.map( (celltype, x) => <Cell key={`${x}-${y}`} type={ celltype }/> ) );

    return(
        <Container>
            { board }
        </Container>
    );
};

export default Board;

