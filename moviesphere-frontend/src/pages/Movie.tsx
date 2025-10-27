import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../services/api";

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
        <div className="container">
            <h1>Detalhe</h1>
            <Link to="/">Voltar</Link>
            <div className="movie-container">
                <img
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt="Movie Poster"
                />
                <div className="movie-details">
                    <h2>{movie.title}</h2>
                    <p>{movie.vote_average}</p>
                    <p>{movie.overview}</p>
                    <button onClick={addFavorite}>Favoritar</button>
                </div>
            </div>
        </div>
    );
}

export default Movie;
