import { prisma } from "../db/index.js";
import { nanoid } from "nanoid";

export const ShareService = {
    create: async (moviesIds: number[]) => {
        const token = nanoid(12);
        const row = await prisma.shareLink.create({
            data: { token, movieIds: JSON.stringify(moviesIds) },
        });
        return { token: row.token };
    },

    getByToken: async (token: string) => {
        const row = await prisma.shareLink.findUnique({ where: { token } });
        if (!row) return null;
        return JSON.parse(row.movieIds) as number[];
    },
};
