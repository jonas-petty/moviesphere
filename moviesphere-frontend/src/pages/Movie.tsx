import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../services/api";
import Header from "../components/Header";
import styles from "../styles/pageLayout.module.css";
import Button from "../components/Button";

function Movie() {
    const { id } = useParams();
    const [movie, setMovie] = useState<any>();

    useEffect(() => {
        api.get(`/movies/${id}`).then(({ data }) => setMovie(data));
    }, [id]);

    async function addFavorite() {
        await api.post("favorites", {
            movie_id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            rating: movie.vote_average,
        });
        // TODO: add a proper modal or something similar
        alert(`${movie.title} Adicionado aos favoritos!`);
    }

    if (!movie) return <p>Carregando...</p>;

    return (
        <>
            <Header />
            <div className={styles.container}>
                <h2>Detalhe</h2>
                <div className="movie-container">
                    <img
                        style={{
                            display: "block",
                            borderRadius: ".5rem",
                            margin: "2rem auto",
                        }}
                        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                        alt="Movie Poster"
                    />
                    <div className="movie-details">
                        <h3>{movie.title}</h3>
                        <p> Avaliação: {movie.vote_average?.toFixed(1)}</p>
                        <p>{movie.overview}</p>
                        <Button onButtonClick={addFavorite}>Favoritar</Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Movie;
