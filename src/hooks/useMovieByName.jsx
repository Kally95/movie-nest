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

export default function useMovieByName(query) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query.trim()) {
      setMovies([]);
      return;
    }

    setLoading(true);
    fetch(
      `${TMDB_API}/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
      options
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch movies");
        return res.json();
      })
      .then((data) => {
        setMovies(data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [query]);

  return [movies, loading, error];
}
