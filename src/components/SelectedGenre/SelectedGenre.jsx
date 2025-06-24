import React, { useEffect, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import Movie from '../Movie/Movie';
import Loader from '../Loader/Loader';
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';

const SelectedGenre = () => {

    const { genreId } = useParams();
    const location = useLocation();

    const [movies, setMovies] = useState([]);
    const theme = useTheme();
    const apiKey = '8d30efeac6cfd2ef4e62e55b6e37dfff';

    const queryParams = new URLSearchParams(location.search);
    const genreNameFromUrl = queryParams.get('name');

    const getMoviesByGenre = async (genreId) => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&api_key=${apiKey}`
        );
        setMovies(data.results);
    };

    useEffect(() => {
        getMoviesByGenre(genreId);
    }, [genreId]);


    if (!movies.length) return <Loader />;


    return (
        <>
            <Typography
                variant="h4"
                sx={{ my: 3, color: theme.palette.text.primary, fontWeight: 'bold', textAlign: 'center' }}
            >
                {genreNameFromUrl} Movies
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2 }}>
                {movies.map((movie) => (
                    <Movie key={movie.id} movie={movie} />
                ))}
            </Box>
        </>
    );
}

export default SelectedGenre;
