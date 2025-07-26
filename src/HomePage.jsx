import Hero from "./components/Hero";
import PopularMoviesSection from "./components/PopularMoviesSection";
import ErrorFallback from "./components/ErrorFallback";
import { ErrorBoundary } from "react-error-boundary";
import { useOutletContext } from "react-router-dom";
import SearchResults from "./components/SearchResults";
import { useAuth } from "./context/AuthContext";
import WatchedMovieSection from "./components/WatchedMovieSection";
import WatchListSection from "./components/WatchListSection";
import { useWatchlistContext } from "./context/WatchlistContext";
import { useWatchedListContext } from "./context/WatchedContext";
import SearchWithDropdown from "./components/SearchWithDropdown"; // 1. Import the new component

function HomePage() {
  const { movies, movieName, loading, handleSearch } = useOutletContext();
  const { watchlist } = useWatchlistContext();
  const { watchedList } = useWatchedListContext();
  const { isLoggedIn } = useAuth();

  return (
    <>
      <SearchWithDropdown
        movieName={movieName}
        handleSearch={handleSearch}
        movies={movies}
        loading={loading}
      />
      <Hero />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <PopularMoviesSection />
      </ErrorBoundary>
      {isLoggedIn && (
        <>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <WatchedMovieSection watchedList={watchedList} />
          </ErrorBoundary>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <WatchListSection watchlist={watchlist} />
          </ErrorBoundary>
        </>
      )}
    </>
  );
}

export default HomePage;
