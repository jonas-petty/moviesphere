import { Router } from "express";
import z from "zod";
import { ShareService } from "../services/share.service.js";
import { FavoritesService } from "../services/favorites.service.js";

const router = Router();

router.post("/", async (req, res, next) => {
    try {
        const schema = z.object({ favorites_ids: z.array(z.number()).min(1) });
        const { favorites_ids } = schema.parse(req.body);
        const { token } = await ShareService.create(favorites_ids);
        res.status(201).json({ token, share_url: `/share/${token}` });
    } catch (error) {
        next(error);
    }
});

router.get("/:token", async (req, res, next) => {
    try {
        const { token } = z
            .object({ token: z.string().min(6) })
            .parse(req.params);
        const movieIds = await ShareService.getByToken(token);
        if (!movieIds) return res.status(404).json({ error: "Link not found" });

        const allFavoriteMovies = await FavoritesService.list();
        const result = allFavoriteMovies.filter((f) =>
            movieIds.includes(f.movieId)
        );
        res.json({ token, movies: result });
    } catch (error) {
        next(error);
    }
});

export default router;
