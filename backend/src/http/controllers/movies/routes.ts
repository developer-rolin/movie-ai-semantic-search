import type { FastifyInstance } from "fastify";
import { getMovieByIdController } from "../movies/get-movie-by-id.controller.js";
import { listMoviesController } from "../movies/list-movies.controller.js";
import { searchSimilarMoviesController } from "../movies/search-similar-movies.controller.js";

export async function movieRoutes(app: FastifyInstance) {
  app.get("/movies", listMoviesController);
  app.get("/movies/search", searchSimilarMoviesController);
  app.get("/movies/:id", getMovieByIdController);
}
