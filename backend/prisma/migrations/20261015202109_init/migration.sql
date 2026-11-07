-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "vector";

-- CreateTable
CREATE TABLE "Movie" (
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

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Movie_tmdbId_key" ON "Movie"("tmdbId");
