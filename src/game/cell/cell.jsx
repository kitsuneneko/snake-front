import { useEffect, useState } from 'react';
import { BoardCell } from './style';


const Cell = ( { props, cellSize } ) => {
    
    const { type } = props;
    const [ color, setColor ] = useState(type);

    useEffect(() => {
        setColor(type);
    },[type]);

    
    return(
        <BoardCell type={color} cellSize={cellSize}/>
    );
};

export default Cell;