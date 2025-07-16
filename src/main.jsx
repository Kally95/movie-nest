import React from "react";
import ReactDOM from "react-dom/client";
import HomePage from "./HomePage";
import MovieDetail from "./components/MovieDetail";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import RootLayout from "./layouts/RootLayout";
import PopularMoviesList from "./components/PopularMoviesList";
import SignIn from "./components/SignIn";
import AuthProvider from "./context/AuthContext";
import WatchedMoviesList from "./components/WatchedMoviesList";
import Watchlist from "./components/Watchlist";
import WatchlistProvider from "./context/WatchlistContext";
import WatchedListProvider from "./context/WatchedContext";
import UserSettings from "./components/UserSettings";
import SignUp from "./components/SignUp";
import { Provider } from "@/components/ui/provider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "popular-movies", element: <PopularMoviesList /> },
      { path: "sign-in", element: <SignIn /> },
      { path: "sign-up", element: <SignUp /> },
      { path: "watched-movies", element: <WatchedMoviesList /> },
      { path: "watchlist", element: <Watchlist /> },
      {
        path: "movie/:id",
        element: <MovieDetail />,
      },
      { path: "settings", element: <UserSettings /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider>
      <AuthProvider>
        <WatchlistProvider>
          <WatchedListProvider>
            <RouterProvider router={router} />
          </WatchedListProvider>
        </WatchlistProvider>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
