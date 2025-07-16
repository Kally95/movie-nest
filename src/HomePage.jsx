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

function HomePage() {
  const { movies, movieName, loading } = useOutletContext();
  const hasSearch = movieName.trim() !== "";
  const hasResults = movies && movies.length > 0;
  const { watchlist } = useWatchlistContext();
  const { watchedList } = useWatchedListContext();
  const { isLoggedIn } = useAuth();
  return (
    <>
      {hasSearch && hasResults ? (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <SearchResults
            movies={movies}
            searchQuery={movieName}
            loading={loading}
          />
        </ErrorBoundary>
      ) : (
        <>
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
      )}
    </>
  );
}

export default HomePage;
