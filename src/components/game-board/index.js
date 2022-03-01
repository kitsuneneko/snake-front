import Cell from "./cell";

const GameBoard = () => {
    const breakpoint = { x: 50, y: 50 };
    const { x, y } = breakpoint;

    const style = {
        height: "500px",
        width: "500px",
        backgroundColor: "silver",
        display: "flex",
        flexWrap: "wrap-reverse",
    };

    let ix = 3;
    let iy = 4;

    const start = (x, y) => {
        return( (x === 3 && y === 4) ? "black" : null );
    }


    const cells = () => {
        const elements = [];
        for(let yi = 0; yi < y; yi++) {
            for(let xi = 0; xi < x; xi++){
                elements.push(<Cell key={`${xi}-${yi}`} props={ start(xi, yi) } />);
            }
        }
        console.log(elements);
        return elements;
    };

    return(
        <div style={style}>
            { cells() }
        </div>
    );
};

export default GameBoard;