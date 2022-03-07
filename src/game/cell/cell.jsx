import { useEffect, useState } from 'react';
import { BoardCell, SneakHead } from './style';
// import styled from 'styled-components';




const Cell = ( { props } ) => {

    const { type } = props;
    const [ color, setColor ] = useState(type);

    useEffect(() => {
        setColor(type);
    },[type]);

    
    return(
        <BoardCell type={color}/>
    )
}


// const celltypes = { cell: `red`, head: `black` }



// const BoardCell = styled.section`
//     height: 10px;
//     width: 10px;
//     background-color: ${ celltypes?.[Cell.color] };
// `;


export default Cell;