import { useState } from "react";
import { api } from "../services/api";
import styles from "../styles/pageLayout.module.css";
import Header from "../components/Header";
import Input from "../components/TextInput";
import Button from "../components/Button";
import MovieCard from "../components/MovieCard";
import Grid from "../components/Grid";

function App() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    async function search(event: any) {
        event.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        const { data } = await api.get("/movies/search", { params: { query } });
        setResults(data.results || []);
        setLoading(false);
    }

    return (
        <>
            <Header />
            <div className={styles.container}>
                <form style={{ display: "flex" }}>
                    <Input
                        value={query}
                        onChange={setQuery}
                        placeholder={"Buscar Filme"}
                    />
                    <Button onButtonClick={search}>Buscar</Button>
                </form>

                {loading && <p>Carregando...</p>}

                <div id="movies-list">
                    <Grid>
                        {results.map((movie: any) => (
                            <MovieCard
                                key={movie.id || movie.movieId}
                                movie={movie}
                            />
                        ))}
                    </Grid>
                </div>
            </div>
        </>
    );
}

export default App;
