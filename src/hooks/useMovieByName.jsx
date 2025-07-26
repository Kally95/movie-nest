import { useEffect, useState } from "react";

const TMDB_API = "https://api.themoviedb.org/3";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ODg5ZjliODg2N2ExMzYxOWE1NDkxNDM2NmFmODFlYiIsIm5iZiI6MTc1MDc4MDAwNC44NzYsInN1YiI6IjY4NWFjODY0YzBlZjk2MmNkNTc5NmQ4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TzbSTXIBU4rMjJ5iCbwD4EpG_1N3YwwSYYx4yYdTvmo",
  },
};

export default function useMovieByName(query, page = 1) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!query.trim()) {
      setMovies([]);
      setTotalPages(0);
      return;
    }

    setLoading(true);

    fetch(
      `${TMDB_API}/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`,
      options
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch movies");
        return res.json();
      })
      .then((data) => {
        setMovies(data.results || []);
        setTotalPages(data.total_pages || 0);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [query, page]);

  return { movies, loading, error, totalPages };
}
