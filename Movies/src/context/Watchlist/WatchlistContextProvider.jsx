import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

export const WatchlistContext = createContext();
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


const WatchlistContextProvider = ({ children }) => {

    const [watchlist, setWatchlist] = useState([]);

    const fetchWatchlist = async () => {
        try {
            const { data } = await axios.get(`${API_BASE_URL}/watchlist`);
            setWatchlist(data || []);
        } catch (err) {
            console.error("Error loading watchlist from server", err);
        }
    };


    const addToWatchList = async (newMovie) => {

        if (watchlist.some((movie) => movie.id === newMovie.id)) {
            toast.info("This movie is already in your watchlist!");
            return;
        }

        try {
            const updated = [...watchlist, newMovie];
            setWatchlist(updated);

            await axios.post(`${API_BASE_URL}/watchlist`, newMovie);
            toast.success("Added to watchlist!");

        } catch (error) {
            toast.error("Failed to add movie to server");
            console.error("Error posting to json-server:", error);
        }
    };

    const removeFromWatchList = async (clearedMovie) => {
        try {
            const updated = watchlist.filter((movie) => movie.id !== clearedMovie.id);
            setWatchlist(updated);

            await axios.delete(`${API_BASE_URL}/watchlist/${clearedMovie.id}`);

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