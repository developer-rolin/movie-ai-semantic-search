import { Link, useSearchParams } from "react-router-dom";
import { useMovies } from "../hooks/useMovies";
import { MovieCard, Pagination } from "../components";

export function Home() {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = searchParams.get("page");
  const page = pageParam ? Number(pageParam) : 1;
  const limit = 12;

  const { data, isLoading, isError, error } = useMovies(page, limit);

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: String(newPage) });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950 text-white">
        <div className="text-xl animate-pulse">Loading movies...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-red-400 p-4">
        <h2 className="text-2xl font-bold mb-2">Oops, something went wrong!</h2>
        <p>
          {error instanceof Error ? error.message : "Unknown error occurred"}
        </p>
        <p className="text-sm text-slate-400 mt-2">
          Please make sure the backend is running on port 3333.
        </p>
      </div>
    );
  }

  const movies = data?.movies ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-2">
              Movie Catalog 🎬
            </h1>
            <p className="text-slate-400">
              Explore our database and discover incredible productions using
              vector semantic search.
            </p>
          </div>

          <Link
            to="/search"
            className="bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 hover:bg-indigo-600/20 px-4 py-2.5 rounded-xl font-medium text-sm transition flex items-center gap-2 self-start md:self-auto shrink-0"
          >
            🔍 AI Semantic Search
          </Link>
        </header>

        {/* Movie Grid */}
        <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </main>

        {/* Pagination */}
        {totalPages > 1 && (
          <footer className="mt-10">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </footer>
        )}
      </div>
    </div>
  );
}
