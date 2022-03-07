import { useState, useEffect } from "react";
import Cell from "../cell/cell";
import Container from "./style";


const createBoard = (x, y) => {
    return(Array(y).fill().map( col => Array(x).fill( { type: 'cell', tailcount: -1 } )));
}


const start = (arr) => {

    let res = JSON.parse(JSON.stringify(arr));
    res[0][0] = { type: 'head', tailcount: -1 };
    return res;
}


const tailsize = 5;



const move = (arr) => {

    let res = JSON.parse(JSON.stringify(arr));
    console.log('res', res.length, res[0].length);
    let idx = -1, idy = 0;
    res = res.map( (row, y) => row.map( (el, x) => { 
        if(el?.type == 'head') {
            idx += x;
            idy += y;
            el = { type: 'tail', tailcount: tailsize};
            console.log('cell',x,y);
        } 
        return el;
    }));

    res = res.map( (row, y) => row.map( (el, x) => { 
        if(el?.tailcount > 0) {
            el.tailcount = el.tailcount - 1;
            console.log(el?.tailcount)

        } 
        if(el?.tailcount == 0)
        {
            el.type = 'cell';
            el.tailcount = el.tailcount - 1;
        }
        return el;
    }));
    console.log(idy,'idy');

    console.log('res', res.length, res[0].length);
    console.log(res);
    // console.log('length',res[idy].length)
    // res[idy][idx] = { type: 'cell' };
    if(idy > (res.length - 1)) {idy = 0;}
    else if(idy < 0) {idy = res.length - 1;}
    else if(idx > (res[idy].length - 1)) {idx = 0;}
    else if(idx < 0) {idx = res[idy].length - 1;}


    res[idy][idx].type = 'head';
    
    return res;
}


const Board = ({ boxSize, boxResolution }) => {
    const { x, y } = boxSize;
    const [ cells, setCells ] = useState(createBoard(x,y));
    const [ direction, setDirection ] = useState();
    console.log(x,y);


    useEffect(() => { setCells(start(cells))
    },[])

    useEffect(() => { 
        const timer = setInterval(() => {
            setCells(move(cells))
        }, 100); 

        return () => clearInterval(timer);
    },[cells])
    const board = cells.map( (row, y) => row.map( (value, x) => <Cell key={`${x}-${y}`} props={ value }/> ) );

    return(
        <Container resolution={ boxResolution }>
            { board }
        </Container>
    );
};

export default Board;

