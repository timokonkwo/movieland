import React, { useState } from "react";
import { useEffect } from "react";
import './App.css'
import searchIcon from './search.svg';
import MovieCard from "./MovieCard";


const API_URL = 'http://omdbapi.com/?apikey=e35627d0';

const movie1 = {
    "Title": "Superman III",
    "Year": "1983",
    "imdbID": "tt0086393",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMzI3ZDllMTctNmI2Mi00OGQ4LTk2ZTQtYTJhMjA5ZGI2YmRkXkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_SX300.jpg"
}

const App = () => {

    const [movies, setMovies] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");

    const searchMovies = async title => {
        const response = await fetch(`${API_URL}&s=${title}`);

        const data = await response.json();

        setMovies(data.Search);

        };

    useEffect(() => {
        searchMovies('superman')
    }, [])

    return (
        <div className="app">
            <h1>MovieLand</h1>

            <div className="search">
                <input
                    placeholder="search for movies"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <img
                 src={searchIcon}
                 alt="search"
                 onClick={() => searchMovies(searchTerm)}
                 />
            </div>

            {movies.length > 0 
                ? (
                    <div className="container">
                        {
                            movies.map(movie => <MovieCard movie={movie}/>)
                        }
                    </div>

                ) : (
                    <div className="empty">
                        <h2>No Movies found</h2>
                    </div>
                )}

        </div>
    );
}


export default App;