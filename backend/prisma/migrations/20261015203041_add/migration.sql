/*
  Warnings:

  - You are about to drop the `Movie` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Movie";

-- CreateTable
CREATE TABLE "movies" (
    "id" SERIAL NOT NULL,
    "tmdbId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "tagline" TEXT,
    "genres" TEXT[],
    "keywords" TEXT[],
    "cast" TEXT[],
    "director" TEXT,
    "releaseYear" INTEGER,
    "voteAverage" DOUBLE PRECISION NOT NULL,
    "voteCount" INTEGER NOT NULL,
    "popularity" DOUBLE PRECISION NOT NULL,
    "budget" BIGINT,
    "revenue" BIGINT,
    "embedding" vector(384),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "movies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "movies_tmdbId_key" ON "movies"("tmdbId");
