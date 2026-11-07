import type { Movie } from "@prisma/client";
import { prisma } from "../../lib/prisma.js";
import type {
  MovieRepository,
  MovieWithDistance,
  PaginatedMoviesResponse,
} from "../movie-repository.js";

export class PrismaMovieRepository implements MovieRepository {
  async findById(id: number): Promise<Movie | null> {
    return await prisma.movie.findUnique({
      where: { id },
    });
  }

  async findMany(
    page: number,
    limit: number,
  ): Promise<PaginatedMoviesResponse> {
    const skip = (page - 1) * limit;

    const [movies, total] = await Promise.all([
      prisma.movie.findMany({
        skip,
        take: limit,
        orderBy: { popularity: "desc" },
      }),

      prisma.movie.count(),
    ]);

    return {
      movies,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findSimilar(
    queryEmbedding: number[],
    limit: number,
  ): Promise<MovieWithDistance[]> {
    // Formata cada número garantindo precisão sem notação científica problemática
    const vectorString = `[${queryEmbedding.map((n) => Number(n).toFixed(8)).join(",")}]`;

    const rawMovies = await prisma.$queryRawUnsafe<any[]>(
      `
      SELECT
        id,
        "tmdbId",
        title,
        overview,
        tagline,
        genres,
        keywords,
        "cast",
        director,
        "releaseYear",
        "voteAverage",
        "voteCount",
        popularity,
        CAST(budget AS FLOAT) as budget,
        CAST(revenue AS FLOAT) as revenue,
        "createdAt",
        CAST(embedding <=> '${vectorString}'::vector AS FLOAT) AS distance
      FROM movies
      WHERE embedding IS NOT NULL
      ORDER BY embedding <=> '${vectorString}'::vector ASC
      LIMIT $1;
      `,
      limit,
    );

    return rawMovies.map((movie) => ({
      ...movie,
      budget: movie.budget ? BigInt(Math.round(movie.budget)) : null,
      revenue: movie.revenue ? BigInt(Math.round(movie.revenue)) : null,
      distance: Number(movie.distance ?? 0),
    }));
  }
}
