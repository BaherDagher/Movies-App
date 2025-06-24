import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const MoviesContext = createContext();

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


const MoviesContextProvider = ({ children }) => {
    const apiKey = "&api_key=9813ce01a72ca1bd2ae25f091898b1c7";
    const url = "https://api.themoviedb.org/3";
    const path = "/discover/movie?sort_by=popularity.desc";
    const apiUrl = url + path + apiKey;
    const [moviesObj, setMoviesObj] = useState(null);

    const getMovies = async () => {
        try {
            const totalPages = 6;
            let allResults = [];

            for (let page = 1; page <= totalPages; page++) {
                const { data } = await axios.get(`${url}${path}${apiKey}&page=${page}`);
                allResults = [...allResults, ...data.results];
            }

            setMoviesObj(allResults);
        } catch (error) {
            console.error("Failed to fetch movies", error);
        }
    };


    useEffect(() => {
        getMovies();
    }, [])


    return (
        <>
            <MoviesContext.Provider value={{ moviesObj }}>
                {children}
            </MoviesContext.Provider>
        </>
    );
}

export default MoviesContextProvider;
