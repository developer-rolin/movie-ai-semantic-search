import type {
  MovieRepository,
  PaginatedMoviesResponse,
} from "../repositories/movie-repository.js";

interface ListMoviesUseCaseRequest {
  page?: number;
  limit?: number;
}

export class ListMoviesUseCase {
  constructor(private movieRepository: MovieRepository) {}

  async execute({
    page = 1,
    limit = 10,
  }: ListMoviesUseCaseRequest): Promise<PaginatedMoviesResponse> {
    return await this.movieRepository.findMany(page, limit);
  }
}
