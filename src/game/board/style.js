import styled from 'styled-components';

const Container = styled.section`
    height: ${({resolution}) => resolution?.height};
    width: ${({resolution}) => resolution?.width};
    background-color: silver;
    display: flex;
    flex-wrap: wrap-reverse;
    border: 1px black solid;
    margin: 0 auto;
    `;

export default Container;