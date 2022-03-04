import { useState } from 'react';
import { BoardCell } from './style';

const Cell = ( { type } ) => {
    // const [ color, setColor ] = useState();
    
    // const style = {
    //     height: "10px",
    //     width: "10px",
    //     //border: "1px black solid"
    //     backgroundColor: color
    // };

    const { celltype } = type;

    console.log(celltype);
    return(
        <BoardCell></BoardCell>
    )
}

export default Cell;