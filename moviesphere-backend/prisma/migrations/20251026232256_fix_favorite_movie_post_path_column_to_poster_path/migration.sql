/*
  Warnings:

  - You are about to drop the column `postPath` on the `FavoriteMovie` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FavoriteMovie" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "movieId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "posterPath" TEXT,
    "rating" REAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_FavoriteMovie" ("createdAt", "id", "movieId", "rating", "title") SELECT "createdAt", "id", "movieId", "rating", "title" FROM "FavoriteMovie";
DROP TABLE "FavoriteMovie";
ALTER TABLE "new_FavoriteMovie" RENAME TO "FavoriteMovie";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
