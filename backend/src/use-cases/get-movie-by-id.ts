import type { Movie } from "@prisma/client";
import type { MovieRepository } from "../repositories/movie-repository.js";

interface GetMovieByIdUseCaseRequest {
  id: number;
}

interface GetMovieByIdUseCaseResponse {
  movie: Movie;
}

export class GetMovieByIdUseCase {
  constructor(private movieRepository: MovieRepository) {}

  async execute({
    id,
  }: GetMovieByIdUseCaseRequest): Promise<GetMovieByIdUseCaseResponse> {
    const movie = await this.movieRepository.findById(id);

    if (!movie) {
      throw new Error("Filme não encontrado.");
    }

    return { movie };
  }
}
