import { useState } from "react";
import { useMoviesSearch } from "../hooks/useMovies";
import { MovieCard, SearchInput } from "../components";
import { useNavigate } from "react-router-dom";

export function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [queryToSearch, setQueryToSearch] = useState("");

  const navigate = useNavigate();

  const { data, isLoading, isError } = useMoviesSearch(queryToSearch);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    setQueryToSearch(searchTerm);
  };

  const movies = data?.movies ?? [];
  const hasSearched = queryToSearch.trim().length > 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Navigation & Header */}
        <header className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-indigo-400 hover:text-indigo-300 font-medium transition cursor-pointer"
          >
            ← Back
          </button>
          <h1 className="text-xl font-bold text-white">
            AI Semantic Search 🧠
          </h1>
        </header>

        {/* Form Controls */}
        <section className="mb-10 max-w-2xl mx-auto">
          <form onSubmit={handleSearch} className="flex gap-3">
            <SearchInput
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Describe the movie you're looking for (e.g., sci-fi movie with time travel)..."
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-6 py-3 rounded-xl transition cursor-pointer shadow-lg shadow-indigo-600/20 shrink-0"
            >
              Search
            </button>
          </form>
        </section>

        {/* Feedback States (Loading, Error, Empty) */}
        {isLoading && (
          <div className="text-center py-20 text-slate-400 animate-pulse">
            Processing semantic vector and querying AI...
          </div>
        )}

        {isError && (
          <div className="text-center py-20 text-red-400">
            An error occurred while performing the semantic search. Check API
            connection.
          </div>
        )}

        {!isLoading && !isError && hasSearched && movies.length === 0 && (
          <div className="text-center py-20 text-slate-400">
            No movies found for "{queryToSearch}". Try describing it
            differently!
          </div>
        )}

        {/* Results Grid - Reusing MovieCard */}
        {!isLoading && !isError && movies.length > 0 && (
          <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </main>
        )}
      </div>
    </div>
  );
}
