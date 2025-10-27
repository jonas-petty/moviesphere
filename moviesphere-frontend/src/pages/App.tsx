import { useState } from "react";
import { api } from "../services/api";
import { Link } from "react-router-dom";

function App() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    async function search() {
        if (!query.trim()) return;

        setLoading(true);
        const { data } = await api.get("/movies/search", { params: { query } });
        setResults(data.results || []);
        setLoading(false);
    }

    return (
        <div id="container">
            <h1>MovieSphere</h1>
            <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar Filme"
            />
            <button onClick={search}>Buscar</button>
            <Link to="/favorites">Favorites</Link>

            {loading && <p>Carregando...</p>}

            <div id="movies-list">
                {results.map((movie: any) => (
                    <div key={movie.id} className="movie-card">
                        <img
                            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                            alt="Movie poster"
                        />
                        <h3>{movie.title}</h3>
                        <p>TMDB: {movie.vote_average?.toFixed(1)}</p>
                        <Link to={`/movie/${movie.id}`}>Detalhes</Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
