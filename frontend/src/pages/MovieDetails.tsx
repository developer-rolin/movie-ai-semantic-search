import { useParams, useNavigate, Link } from "react-router-dom";
import { useMovieDetails } from "../hooks/useMovies";

export function MovieDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const movieId = Number(id);

  const { data, isLoading, isError, error } = useMovieDetails(movieId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950 text-white">
        <div className="text-xl animate-pulse">Loading movie details...</div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-red-400 p-4">
        <h2 className="text-2xl font-bold mb-2">Movie not found!</h2>
        <p className="mb-6">
          {error instanceof Error
            ? error.message
            : "Could not load movie information."}
        </p>
        <Link
          to="/"
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition"
        >
          Back to Catalog
        </Link>
      </div>
    );
  }

  const { movie } = data;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-sm text-indigo-400 hover:text-indigo-300 mb-6 transition font-medium cursor-pointer"
        >
          ← Back
        </button>

        {/* Main Details Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
                {movie.title}
              </h1>
              {movie.tagline && (
                <p className="text-indigo-400 italic text-base">
                  "{movie.tagline}"
                </p>
              )}
            </div>
            <div className="bg-amber-500/10 border border-amber-500/20 text-amber-400 px-3 py-1.5 rounded-xl font-bold text-lg">
              ★ {movie.voteAverage.toFixed(1)}{" "}
              <span className="text-xs font-normal text-slate-400">
                ({movie.voteCount} votes)
              </span>
            </div>
          </div>

          {/* Overview */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Overview
            </h3>
            <p className="text-slate-300 leading-relaxed text-base">
              {movie.overview || "No overview available for this movie."}
            </p>
          </div>

          {/* Genres */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Genres
            </h3>
            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre, idx) => (
                <span
                  key={idx}
                  className="bg-slate-800 text-slate-200 text-xs font-medium px-3 py-1 rounded-full border border-slate-700"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>

          {/* Technical Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-6 border-t border-slate-800">
            <div>
              <span className="block text-xs font-medium text-slate-500 uppercase">
                Director
              </span>
              <span className="text-white font-medium">
                {movie.director || "Not informed"}
              </span>
            </div>
            <div>
              <span className="block text-xs font-medium text-slate-500 uppercase">
                Release Year
              </span>
              <span className="text-white font-medium">
                {movie.releaseYear || "N/A"}
              </span>
            </div>
            <div>
              <span className="block text-xs font-medium text-slate-500 uppercase">
                Popularity
              </span>
              <span className="text-white font-medium">
                {movie.popularity.toFixed(1)}
              </span>
            </div>
            <div>
              <span className="block text-xs font-medium text-slate-500 uppercase">
                Budget
              </span>
              <span className="text-white font-medium">
                {movie.budget > 0
                  ? `$${movie.budget.toLocaleString()}`
                  : "Not disclosed"}
              </span>
            </div>
            <div>
              <span className="block text-xs font-medium text-slate-500 uppercase">
                Revenue
              </span>
              <span className="text-white font-medium">
                {movie.revenue > 0
                  ? `$${movie.revenue.toLocaleString()}`
                  : "Not disclosed"}
              </span>
            </div>
          </div>

          {/* Cast */}
          {movie.cast && movie.cast.length > 0 && (
            <div className="mt-6 pt-6 border-t border-slate-800">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Main Cast
              </h3>
              <p className="text-slate-300 text-sm">{movie.cast.join(", ")}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
