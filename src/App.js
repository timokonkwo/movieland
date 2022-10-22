import React, { useState } from "react";
import { useEffect } from "react";
import './App.css'
import searchIcon from './search.svg';
import MovieCard from "./MovieCard";
import Loader from "./Loader";


const API_URL = 'https://omdbapi.com/?apikey=e35627d0';

const App = () => {

    const [movies, setMovies] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");

    const [loading, setLoading] = useState(true);

    const searchMovies = async title => {
        setLoading(true)

        const response = await fetch(`${API_URL}&s=${title}`);

        const data = await response.json();

        setMovies(data.Search);

        setLoading(false)

        };

    useEffect(() => {
        searchMovies('superman')
    }, [])

   if (loading) {
        return (
            <Loader/>
        )
   }

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

            {
                    movies && movies.length > 0 
                    ? (
                        <div className="container">
                            {
                                movies.map(movie => <MovieCard key={movie.imdbID} movie={movie}/>)
                            }
                        </div>

                    ) : (
                        <div className="empty">
                            <h2>No Movies found</h2>
                        </div>
                    )
            }

        </div>
    );
}


export default App;