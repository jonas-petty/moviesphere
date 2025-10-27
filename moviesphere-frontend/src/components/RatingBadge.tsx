import styled from "styled-components";

const Badge = styled.span`
    background-color: var(--action-color);
    color: var(--background-color);
    padding: 4px 8px;
    border-radius: 6px;
    font-weight: bold;
    width: fit-content;
`;

function RatingBadge({ rating }: any) {
    return <Badge>{rating.toFixed(1)}</Badge>;
}

export default RatingBadge;
