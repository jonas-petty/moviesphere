import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../services/api";

function Share() {
    const { token } = useParams();
    const [data, setData] = useState<any>();

    useEffect(() => {
        api.get(`/share/${token}`)
            .then(({ data }) => setData(data))
            .catch(() => setData({ error: true }));
    }, [token]);

    if (!data) return <p>Carregando...</p>;
    if (data.error) return <p>Link inválido ou expirado.</p>;
    return (
        <div id="container">
            <h1>Favoritos Compartilhados</h1>
            <Link to="/">Buscar</Link>
            <div id="movies-container">
                {data.movies.map((movie: any) => (
                    <div key={movie.id} className="movie-card">
                        <img
                            src={`https://image.tmdb.org/t/p/w200${movie.posterPath}`}
                            alt="Movie poster"
                        />
                        <h3>{movie.title}</h3>
                        <p>TMDB: {movie.rating?.toFixed(1)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Share;
