import styled from 'styled-components';

const ctype = { cell: `red`, head: `black` }

const BoardCell = styled.section`
    height: 10px;
    width: 10px;
    background-color: ${({type}) => ctype?.[type]};
    `;

export {
    BoardCell,
};