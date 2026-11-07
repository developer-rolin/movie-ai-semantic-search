import { Link } from "react-router-dom";
import type { MovieCardProps } from "./MovieCard.types";

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between hover:border-slate-700 transition-all shadow-lg">
      <div>
        <div className="flex justify-between items-start gap-2 mb-2">
          <h3
            className="text-lg font-bold text-white line-clamp-1"
            title={movie.title}
          >
            {movie.title}
          </h3>
          <span className="bg-amber-500/10 text-amber-400 text-xs font-semibold px-2 py-1 rounded border border-amber-500/20">
            ★ {movie.voteAverage.toFixed(1)}
          </span>
        </div>

        {movie.tagline && (
          <p className="text-xs text-indigo-400 italic mb-3 line-clamp-1">
            "{movie.tagline}"
          </p>
        )}

        <p className="text-sm text-slate-400 line-clamp-3 mb-4">
          {movie.overview || "No overview available."}
        </p>
      </div>

      <div>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {movie.genres.slice(0, 3).map((genre, idx) => (
            <span
              key={idx}
              className="bg-slate-800 text-slate-300 text-[10px] font-medium px-2 py-0.5 rounded"
            >
              {genre}
            </span>
          ))}
        </div>

        <div className="text-xs text-slate-500 flex justify-between items-center pt-3 border-t border-slate-800/80">
          <span>Year: {movie.releaseYear || "N/A"}</span>
          <Link
            to={`/movies/${movie.id}`}
            className="text-indigo-400 font-medium hover:underline cursor-pointer"
          >
            View details →
          </Link>
        </div>
      </div>
    </div>
  );
}
