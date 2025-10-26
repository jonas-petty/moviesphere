import { Router } from "express";
import z from "zod";
import { searchMovies, getMovieById } from "../services/tmdb.service.js";

const router = Router();

router.get("/search", async (req, res, next) => {
    try {
        const schema = z.object({
            query: z.string().min(1),
            page: z.string().optional(),
        });

        const { query, page } = schema.parse(req.query);
        const data = await searchMovies(query, page ? Number(page) : 1);
        res.json(data);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const { id } = z.object({ id: z.string() }).parse(req.params);
        const data = await getMovieById(id);
        res.json(data);
    } catch (error) {
        next(error);
    }
});

export default router;
