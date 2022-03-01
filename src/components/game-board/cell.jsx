import { useState } from 'react';

const Cell = ( { props } ) => {
    const [ color, setColor ] = useState(props);
    
    const style = {
        height: "10px",
        width: "10px",
        //border: "1px black solid"
        backgroundColor: color
    };


    return(
        <div style={style}></div>
    )
}

export default Cell;