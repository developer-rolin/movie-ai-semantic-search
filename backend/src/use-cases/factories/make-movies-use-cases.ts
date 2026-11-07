import { PrismaMovieRepository } from "../../repositories/prisma/prisma-movie-repository.js";
import { GetMovieByIdUseCase } from "../get-movie-by-id.js";
import { ListMoviesUseCase } from "../list-movies.js";
import { SearchSimilarMoviesUseCase } from "../search-similar-movies.js";

export function makeGetMovieByIdUseCase() {
  const movieRepository = new PrismaMovieRepository();
  return new GetMovieByIdUseCase(movieRepository);
}

export function makeListMoviesUseCase() {
  const movieRepository = new PrismaMovieRepository();
  return new ListMoviesUseCase(movieRepository);
}

export function makeSearchSimilarMoviesUseCase() {
  const movieRepository = new PrismaMovieRepository();
  return new SearchSimilarMoviesUseCase(movieRepository);
}
