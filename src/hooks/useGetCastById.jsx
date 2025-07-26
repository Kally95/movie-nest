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

export default function useGetCastById(id = "") {
  const [creditsData, setCreditsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    fetch(`${TMDB_API}/movie/${id}/credits?language=en-US`, options)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setCreditsData(data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return { creditsData, error, loading };
}
