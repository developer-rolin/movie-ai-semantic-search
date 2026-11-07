export interface Movie {
  id: number;
  title: string;
  tagline?: string | null;
  overview?: string | null;
  voteAverage: number;
  genres: string[];
  releaseYear?: number | null;
}

export interface MovieCardProps {
  movie: Movie;
}
