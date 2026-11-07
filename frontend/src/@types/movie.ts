export interface Movie {
  id: number;
  tmdbId: number;
  title: string;
  overview: string;
  tagline: string | null;
  genres: string[];
  keywords: string[];
  cast: string[];
  director: string | null;
  releaseYear: number | null;
  voteAverage: number;
  voteCount: number;
  popularity: number;
  budget: number;
  revenue: number;
  createdAt: string;
}

export interface MoviesResponse {
  movies: Movie[];
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
}
