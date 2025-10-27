import styled from "styled-components";

const StyledInput = styled.input`
    font: inherit;
    width: 100%;
    background-color: var(--secondary-background-color);
    color: var(--font-color);
    padding: 1rem;
    margin: 1rem 0;
    border: 1px solid gray;
    border-radius: 5px;
    font-size: 1.5rem;

    &:focus {
        outline: 1px solid var(--action-color);
        border: 1px solid var(--action-color);
    }
`;

function Input({ value, onChange, placeholder }: any) {
    return (
        <StyledInput
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder={placeholder}
        />
    );
}

export default Input;
