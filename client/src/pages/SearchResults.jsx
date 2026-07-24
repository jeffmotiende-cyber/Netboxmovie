import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api/axios';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const query = searchParams.get('q') || '';
  const page = parseInt(searchParams.get('page')) || 1;

  useEffect(() => {
    if (!query) return;
    const search = async () => {
      setLoading(true);
      try {
        const { data } = await api.get('/search/movie', { params: { query, page } });
        setMovies(data.results || []);
        setTotalPages(Math.min(data.total_pages || 1, 500));
      } catch {
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };
    search();
  }, [query, page]);

  if (!query) {
    return (
      <div className="page">
        <div className="container">
          <EmptyState title="Search movies" message="Enter a search term to find movies." />
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        <h1 className="section-title">
          Results for "{query}"
        </h1>

        {loading ? (
          <Loader />
        ) : movies.length === 0 ? (
          <EmptyState title="No results found" message={`No movies found for "${query}". Try a different search term.`} />
        ) : (
          <>
            <div className="grid grid-movies">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={(p) => setSearchParams({ q: query, page: p })} />
          </>
        )}
      </div>
    </div>
  );
}
