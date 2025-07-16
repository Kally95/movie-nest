import { useState, useEffect } from "react";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ODg5ZjliODg2N2ExMzYxOWE1NDkxNDM2NmFmODFlYiIsIm5iZiI6MTc1MDc4MDAwNC44NzYsInN1YiI6IjY4NWFjODY0YzBlZjk2MmNkNTc5NmQ4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TzbSTXIBU4rMjJ5iCbwD4EpG_1N3YwwSYYx4yYdTvmo",
  },
};
const TMDB_API = "https://api.themoviedb.org/3";

export default function usePopularMovies({ limit = 5 } = {}) {
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchPopularMovies = () => {
      setLoading(true);
      fetch(
        `${TMDB_API}/discover/movie?include_adult=false&language=en-US&page=1&sort_by=popularity.desc`,
        options
      )
        .then((res) => {
          if (!res.ok) throw new Error("Network response was not ok");
          return res.json();
        })
        .then((res) => {
          setPopularMovies(res.results);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    };
    fetchPopularMovies();
  }, [limit]);

  return [popularMovies, error, loading];
}
