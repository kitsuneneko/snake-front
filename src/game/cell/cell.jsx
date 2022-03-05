import { useEffect, useState } from 'react';
// import { BoardCell, SneakHead } from './style';
import styled from 'styled-components';


const celltypes = { cell: `red`, head: `black` }

const Cell = ( { props } ) => {

    const { type } = props;
    const [ color, setColor ] = useState(type);

    const BoardCell = styled.section`
        height: 10px;
        width: 10px;
        background-color: ${ celltypes?.[color] };
    `;

    console.log(celltypes?.[type])

    return(
        <BoardCell></BoardCell>
    )
}

export default Cell;