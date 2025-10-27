import styled from "styled-components";
import styles from "../styles/pageLayout.module.css";
import { Link } from "react-router-dom";

const StyledHeader = styled.header`
    max-width: 1080px;
    margin: auto;
    padding: 1.5rem;

    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--action-color);
`;

const Nav = styled.nav`
    ul {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    li {
        list-style-type: none;
    }
`;
function Header() {
    const isHome = location.pathname === "/";

    return (
        <StyledHeader>
            <h1>MovieSphere</h1>
            <Nav>
                <ul>
                    <li>
                        {!isHome && (
                            <Link className={styles.link} to="/">
                                Home
                            </Link>
                        )}
                    </li>
                    <li>
                        <Link className={styles.link} to="/favorites">
                            Favoritos
                        </Link>
                    </li>
                </ul>
            </Nav>
        </StyledHeader>
    );
}

export default Header;
