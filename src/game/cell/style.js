import styled from 'styled-components';

const type = { cell: `red`, head: `black` }

const BoardCell = styled.section`
    height: 10px;
    width: 10px;
    background-color: red;
    `;

const SneakHead = styled.section`
    height: 10px;
    width: 10px;
    background-color: black;
    `;

export {
    BoardCell,
    SneakHead
};