import type { Movie } from "@prisma/client";

// Interface para o retorno da busca por similaridade com a distância calculada
export interface MovieWithDistance extends Movie {
  distance: number;
}

// Interface para o retorno paginado
export interface PaginatedMoviesResponse {
  movies: Movie[];
  total: number;
  page: number;
  totalPages: number;
}

// Contrato que qualquer repositório de filmes deve seguir
export interface MovieRepository {
  findById(id: number): Promise<Movie | null>;
  findMany(page?: number, limit?: number): Promise<PaginatedMoviesResponse>;
  findSimilar(
    queryEmbedding: number[],
    limit?: number,
  ): Promise<MovieWithDistance[]>;
}
