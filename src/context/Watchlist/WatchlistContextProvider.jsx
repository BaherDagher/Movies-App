import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

export const WatchlistContext = createContext();

const WatchlistContextProvider = ({ children }) => {
    const [watchlist, setWatchlist] = useState([]);

    const fetchWatchlist = async () => {
        try {
            const { data } = await axios.get(`https://684b446a165d05c5d35c0248.mockapi.io/propertiesapi/watchlist`);
            setWatchlist(data || []);
        } catch (err) {
            console.error("Error loading watchlist from server", err);
        }
    };

    const addToWatchList = async (newMovie) => {
        const tmdbID = newMovie.realID || newMovie.id;

        const alreadyExists = watchlist.some(movie => (movie.realID || movie.id) == tmdbID);
        if (alreadyExists) {
            toast.info("This movie is already in your watchlist!");
            return;
        }

        const movieWithRealID = { ...newMovie, realID: tmdbID };

        try {
            const { data: savedMovie } = await axios.post(`https://684b446a165d05c5d35c0248.mockapi.io/propertiesapi/watchlist`, movieWithRealID);
            setWatchlist(prev => [...prev, savedMovie]);
            toast.success("Added to watchlist!");
        } catch (error) {
            toast.error("Failed to add movie to server");
            console.error("Error posting to json-server:", error);
        }
    };

    const removeFromWatchList = async (clearedMovie) => {
        const tmdbID = clearedMovie.realID || clearedMovie.id;

        const matched = watchlist.find(movie => (movie.realID || movie.id) == tmdbID);

        if (!matched) {
            toast.info("This movie is not in your watchlist");
            return;
        }

        try {
            await axios.delete(`https://684b446a165d05c5d35c0248.mockapi.io/propertiesapi/watchlist/${matched.id}`);
            setWatchlist(prev => prev.filter(movie => movie.id !== matched.id));
            toast.error("Removed from watchlist");
        } catch (error) {
            console.error("Failed to remove from watchlist", error);
            toast.error("Error removing movie from watchlist");
        }
    };

    useEffect(() => {
        fetchWatchlist();
    }, []);

    return (
        <WatchlistContext.Provider value={{ watchlist, addToWatchList, removeFromWatchList }}>
            {children}
        </WatchlistContext.Provider>
    );
};

export default WatchlistContextProvider;