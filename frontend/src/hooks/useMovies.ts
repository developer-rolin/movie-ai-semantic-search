import { useQuery } from "@tanstack/react-query";
import { getMovieById, getMovies, searchMovies } from "../http/api";

export function useMovies(page: number, limit = 12) {
  return useQuery({
    queryKey: ["movies", page],
    queryFn: () => getMovies(page, limit),
    staleTime: 1000 * 60 * 5,
  });
}

export function useMovieDetails(movieId: number) {
  return useQuery({
    queryKey: ["movie", movieId],
    queryFn: () => getMovieById(movieId),
    enabled: !isNaN(movieId),
  });
}

export function useMoviesSearch(queryToSearch: string) {
  return useQuery({
    queryKey: ["movies-search", queryToSearch],
    queryFn: () => searchMovies(queryToSearch),
    enabled: queryToSearch.trim().length > 0,
  });
}
