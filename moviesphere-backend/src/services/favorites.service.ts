import { prisma } from "../db/index.js";

export const FavoritesService = {
    list: () =>
        prisma.favoriteMovie.findMany({ orderBy: { createdAt: "desc" } }),

    add: (payload: {
        movieId: number;
        title: string;
        posterPath?: string;
        rating?: number;
    }) => prisma.favoriteMovie.create({ data: payload }),

    remove: (movieId: number) =>
        prisma.favoriteMovie.deleteMany({ where: { movieId } }),
};
