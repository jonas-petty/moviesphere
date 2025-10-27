import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../services/api";
import Grid from "../components/Grid";
import MovieCard from "../components/MovieCard";
import styles from "../styles/pageLayout.module.css";
import Header from "../components/Header";

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
        <>
            <Header />
            <div className={styles.container}>
                <h2>Favoritos Compartilhados</h2>
                <Grid>
                    {data.movies.map((movie: any) => (
                        <MovieCard
                            key={movie.id || movie.movieId}
                            movie={movie}
                        />
                    ))}
                </Grid>
            </div>
        </>
    );
}

export default Share;
