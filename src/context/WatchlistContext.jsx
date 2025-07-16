import { createContext, useContext, useState, useEffect } from "react";

export const WatchlistContext = createContext();

const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState(() => {
    const stored = localStorage.getItem("watchlist");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const toggleWatchlist = (movieObj) => {
    const movieExists = watchlist.find((movie) => movie.id === movieObj.id);
    if (movieExists) {
      const newWatchlist = watchlist.filter(
        (movie) => movie.id !== movieObj.id
      );
      setWatchlist(newWatchlist);
      return;
    }
    setWatchlist((prevList) => [...prevList, movieObj]);
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, toggleWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
};

export default WatchlistProvider;

export const useWatchlistContext = () => useContext(WatchlistContext);
