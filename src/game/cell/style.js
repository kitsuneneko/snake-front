import styled from 'styled-components';

const ctype = { cell: null, head: `orange`, tail: 'lightgreen' }

const BoardCell = styled.section`
    height: 50px;
    width: 50px;
    background-color: ${({type}) => ctype?.[type]};
    `;

export {
    BoardCell,
};