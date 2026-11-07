import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { Search } from "../pages/Search";
import { MovieDetails } from "../pages/MovieDetails";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movies/:id" element={<MovieDetails />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  );
}
