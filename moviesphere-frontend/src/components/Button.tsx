import styled from "styled-components";

const StyledButton = styled.button`
    font: inherit;
    cursor: pointer;
    margin: 1rem;
    padding: 1rem;
    background-color: var(--action-color);
    border: 1px solid var(--action-color);
    border-radius: 5px;
    color: var(--background-color);
    font-weight: bold;
    transition: 0.2s;

    &:hover {
        border: 1px solid white;
    }
`;

function Button({ onButtonClick, children }: any) {
    return <StyledButton onClick={onButtonClick}>{children}</StyledButton>;
}

export default Button;
