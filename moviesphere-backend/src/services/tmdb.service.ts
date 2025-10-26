import axios from "axios";

const apiKey = process.env.TMD_API_KEY!;
if (!apiKey) throw new Error("TMD_API_KEY is not available on .env");

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: { api_key: apiKey, language: "pt-BR", include_adult: false },
});

export async function searchMovies(query: string, page: number = 1) {
    const { data } = await api.get("/search/movie", {
        params: { query, page },
    });
    return data;
}

export async function getMovieById(id: string | number) {
    const { data } = await api.get(`/movie/${id}`);
    return data;
}
