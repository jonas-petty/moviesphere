import styled from "styled-components";

const StyledGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1rem;
    margin-top: 2rem;
`;

function Grid({ children }: any) {
    return <StyledGrid>{children}</StyledGrid>;
}

export default Grid;
