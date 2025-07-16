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

export default function useMovieById(id = "") {
  const [movieById, setMovieById] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    if (id === "") return;
    const fetchMovieById = () => {
      setLoading(true);
      fetch(`${TMDB_API}/movie/${id}?language=en-US`, options)
        .then((res) => {
          if (!res.ok) throw new Error("Network response was not ok");
          return res.json();
        })
        .then((res) => {
          setMovieById(res);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    };
    fetchMovieById();
  }, [id]);

  return [movieById, error, loading];
}
