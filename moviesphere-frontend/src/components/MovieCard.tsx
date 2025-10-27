import { Link } from "react-router-dom";
import styled from "styled-components";
import styles from "../styles/pageLayout.module.css";
import RatingBadge from "./RatingBadge";

const StyledMovieCard = styled.div`
    max-width: 25rem;
    background-color: var(--secondary-background-color);
    padding: 1rem;
    border-radius: 0.5rem;
    transition: transform 0.2s;

    &:hover {
        transform: scale(1.02);
    }
`;

const Poster = styled.img`
    width: 100%;
    border-radius: 4px;
    margin-bottom: 0.5rem;
`;

const Info = styled.div`
    display: flex;
    flex-direction: column;
`;

function MovieCard({ movie, action }: any) {
    return (
        <StyledMovieCard>
            <Poster
                src={`https://image.tmdb.org/t/p/w300${
                    movie.poster_path || movie.posterPath
                }`}
            />
            <Info>
                <h2>{movie.title}</h2>
                <p>
                    TMDB:{" "}
                    <RatingBadge rating={movie.rating || movie.vote_average} />
                </p>
                {action}
                <Link
                    className={styles.link}
                    to={`/movie/${movie.movieId || movie.id}`}
                >
                    Detalhes
                </Link>
            </Info>
        </StyledMovieCard>
    );
}

export default MovieCard;
