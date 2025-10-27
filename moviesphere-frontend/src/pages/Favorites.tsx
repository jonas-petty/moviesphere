import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Link } from "react-router-dom";

function Favorites() {
    const [list, setList] = useState<any[]>([]);
    const [shareUrl, setShareUrl] = useState<string | null>(null);

    async function load() {
        api.get("/favorites").then(({ data }) => setList(data));
    }

    useEffect(() => {
        load();
    }, []);

    async function remove(movieId: number) {
        await api.delete(`/favorites/${movieId}`);
        load();
    }

    async function share() {
        const ids = list.map((movie) => movie.movieId);
        const { data } = await api.post("/share", { favorites_ids: ids });
        const url = `${location.origin}/share/${data.token}`;
        setShareUrl(url);
        await navigator.clipboard?.writeText(url);
        alert("Link copiado!");
    }

    return (
        <div id="container">
            <h1>Favoritos</h1>
            <Link to="/">Buscar</Link>
            <button disabled={!list.length} onClick={share}>
                Gerar Link
            </button>
            {shareUrl && (
                <p>
                    Compartilhe: <a href={shareUrl}>{shareUrl}</a>
                </p>
            )}
            <div id="movies-container">
                {list.map((movie: any) => (
                    <div key={movie.id} className="movie-card">
                        <img
                            src={`https://image.tmdb.org/t/p/w200${movie.posterPath}`}
                            alt="Movie poster"
                        />
                        <h3>{movie.title}</h3>
                        <p>TMDB: {movie.rating?.toFixed(1)}</p>
                        <button onClick={() => remove(movie.movieId)}>
                            Romover
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Favorites;
