import { Router } from "express";
import z from "zod";
import { FavoritesService } from "../services/favorites.service.js";

const router = Router();

router.get("/", async (_req, res, next) => {
    try {
        const list = await FavoritesService.list();
        res.json(list);
    } catch (error) {
        next(error);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const schema = z.object({
            movie_id: z.number(),
            title: z.string().min(1),
            poster_path: z.string().optional(),
            rating: z.number().optional(),
        });

        const { movie_id, title, poster_path, rating } = schema.parse(req.body);
        const fav = await FavoritesService.add({
            movieId: movie_id,
            title,
            posterPath: poster_path === undefined ? null : poster_path,
            rating: rating === undefined ? null : rating,
        });
        res.status(201).json(fav);
    } catch (error) {
        next(error);
    }
});

router.delete("/:movieId", async (req, res, next) => {
    try {
        const { movieId } = z.object({ movieId: z.string() }).parse(req.params);
        const result = await FavoritesService.remove(Number(movieId));
        res.json({ delete: result.count });
    } catch (error) {}
});

export default router;
