import type { MoviesResponse, Movie } from "../@types/movie";

const API_BASE_URL = "http://localhost:3333";

export async function getMovies(page = 1, limit = 12): Promise<MoviesResponse> {
  const response = await fetch(
    `${API_BASE_URL}/movies?page=${page}&limit=${limit}`,
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar a lista de filmes.");
  }

  return response.json();
}

export async function getMovieById(id: number): Promise<{ movie: Movie }> {
  const response = await fetch(`${API_BASE_URL}/movies/${id}`);

  if (!response.ok) {
    throw new Error("Erro ao buscar os detalhes do filme.");
  }

  return response.json();
}

export async function searchMovies(
  query: string,
): Promise<{ movies: Movie[] }> {
  const response = await fetch(
    `${API_BASE_URL}/movies/search?q=${encodeURIComponent(query)}`,
  );

  if (!response.ok) {
    throw new Error("Erro ao realizar a busca semântica.");
  }

  return response.json();
}
