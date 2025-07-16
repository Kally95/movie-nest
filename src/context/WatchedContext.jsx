import { createContext, useContext, useState, useEffect } from "react";

export const WatchedContext = createContext();

const WatchedListProvider = ({ children }) => {
  const [watchedList, setWatchedlist] = useState(() => {
    const stored = localStorage.getItem("watchedList");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("watchedList", JSON.stringify(watchedList));
  }, [watchedList]);

  const toggleWatchedList = (movieObj) => {
    const movieExists = watchedList.find((movie) => movie.id === movieObj.id);
    if (movieExists) {
      const newWatchedlist = watchedList.filter(
        (movie) => movie.id !== movieObj.id
      );
      setWatchedlist(newWatchedlist);
      return;
    }
    setWatchedlist((prevList) => [...prevList, movieObj]);
  };

  return (
    <WatchedContext.Provider value={{ watchedList, toggleWatchedList }}>
      {children}
    </WatchedContext.Provider>
  );
};

export default WatchedListProvider;

export const useWatchedListContext = () => useContext(WatchedContext);
