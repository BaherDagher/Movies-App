import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const MoviesContext = createContext();

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


const MoviesContextProvider = ({ children }) => {

    const [moviesObj, setMoviesObj] = useState(null);

    const getMovies = async () => {
        try {
            const { data } = await axios.get(`${API_BASE_URL}/movies`);
            setMoviesObj(data);
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
