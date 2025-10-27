import { useEffect, useState } from "react";
import { api } from "../services/api";
import Header from "../components/Header";
import styles from "../styles/pageLayout.module.css";
import Button from "../components/Button";
import Grid from "../components/Grid";
import MovieCard from "../components/MovieCard";

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
        <>
            <Header />
            <div className={styles.container}>
                <h2>Favoritos</h2>
                {!list.length && (
                    <p>Adicione filmes aos favoritos para velos aqui!</p>
                )}
                <Button disabled={!list.length} onButtonClick={share}>
                    Gerar Link
                </Button>
                {shareUrl && (
                    <p>
                        Compartilhe: <a href={shareUrl}>{shareUrl}</a>
                    </p>
                )}
                <Grid>
                    {list.map((movie: any) => (
                        <MovieCard
                            key={movie.id || movie.movieId}
                            movie={movie}
                            action={
                                <Button
                                    onButtonClick={() => remove(movie.movieId)}
                                >
                                    Deletar
                                </Button>
                            }
                        />
                    ))}
                </Grid>
            </div>
        </>
    );
}

export default Favorites;
