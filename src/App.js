import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";
import "./App.css";

const API_URL = "https://www.omdbapi.com/";
const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovies = async (title) => {
    if (!API_KEY) throw new Error("Missing REACT_APP_OMDB_API_KEY");

    const response = await fetch(
      `${API_URL}?apikey=${API_KEY}&s=${encodeURIComponent(title)}`
    );
    const data = await response.json();
    setMovies(data.Search ?? []);
  };

  useEffect(() => {
    searchMovies("Batman").catch(() => setMovies([]));
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <input
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search for movies"
        />
        <img
          src={SearchIcon}
          alt="Search"
          onClick={() => searchMovies(searchTerm).catch(() => setMovies([]))}
        />
      </div>

      {movies.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty"><h2>No movies found</h2></div>
      )}
    </div>
  );
};

export default App;
