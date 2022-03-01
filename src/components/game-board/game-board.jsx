const GameBoard = () => {
    const breakpoint = { x: 50, y: 50 };
    const { x, y } = breakpoint;

    const cells = () => {
        elements = {};
        for(let yi = 0; yi <= y; y++) {
            for(let xi = 0; xi <= x; x++){
                elements.push(() => {
                    return(
                        <Cell key={`${x}-${y}`} />
                    );
                });
            }
        }
        return elements;
    } 

    return(
        <div>
            {elements}
        </div>
    );
};

export default GameBoard;