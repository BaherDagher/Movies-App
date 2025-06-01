import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, useTheme, Divider } from '@mui/material';
import Loader from '../Loader/Loader';
import StarRateIcon from '@mui/icons-material/StarRate';

const MovieDetails = () => {
    const [movieData, setMovieData] = useState(null);
    const imgPath = "https://image.tmdb.org/t/p/w500/";
    const { id } = useParams();
    const theme = useTheme();

    const getMovieDetailsById = async (movieId) => {
        try {
            const { data } = await axios.get(
                `https://api.themoviedb.org/3/movie/${movieId}?api_key=9813ce01a72ca1bd2ae25f091898b1c7`
            );
            console.log(data)
            setMovieData(data);
        } catch (error) {
            console.error("Failed to fetch movie details:", error);
        }
    };

    useEffect(() => {
        if (id) {
            getMovieDetailsById(id);
        }
    }, [id]);

    if (!movieData) return <Loader />;

    return (
        <Box
            sx={{
                maxWidth: 1200,
                mx: 'auto',
                px: 3,
                pt: 3,
                color: theme.palette.text.primary,
                my: 8
            }}
        >
            <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>

                <Box sx={{ flex: 1, minWidth: 300 }}>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        {movieData.original_title}
                    </Typography>
                    <Typography mb={1}>
                        <strong>Tagline:</strong> {movieData.tagline || 'N/A'}
                    </Typography>

                    <Typography mb={1}>
                        <strong>Overview:</strong> {movieData.overview || 'N/A'}
                    </Typography>

                    <Typography mb={1}>
                        <strong>Genres:</strong> {movieData.genres?.map(g => g.name).join(', ') || 'N/A'}
                    </Typography>

                    <Typography mb={1}>
                        <strong>Release Date:</strong> {movieData.release_date || 'N/A'}
                    </Typography>

                    <Typography mb={1}>
                        <strong>Runtime:</strong> {movieData.runtime ? `${movieData.runtime} mins` : 'N/A'}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    {movieData.budget > 0 && (
                        <Typography mb={1}>
                            <strong>Budget:</strong> ${movieData.budget.toLocaleString()}
                        </Typography>
                    )}

                    {movieData.revenue > 0 && <Typography mb={1}>
                        <strong>Revenue:</strong> {movieData.revenue ? `$${movieData.revenue.toLocaleString()}` : 'N/A'}
                    </Typography>}

                    <Typography mb={1}>
                        <strong>Language(s):</strong> {movieData.spoken_languages?.map(l => l.english_name).join(', ') || 'N/A'}
                    </Typography>

                    <Typography mb={1}>
                        <strong>Status:</strong> {movieData.status || 'N/A'}
                    </Typography>

                    <Typography mb={1}>

                        <Box sx={{ display: 'flex', alignContent: 'center' }}>
                            <strong>Vote Average:</strong>
                            <StarRateIcon sx={{ color: 'orange', mx: 1 }} />
                            {movieData.vote_average || 'N/A'}
                        </Box>

                    </Typography>
                </Box>

                {/* Poster Image */}
                <Box sx={{ minWidth: 250, maxWidth: 300, flexShrink: 0 }}>
                    <img
                        src={imgPath + movieData.poster_path}
                        alt={movieData.original_title}
                        style={{ width: '100%', borderRadius: 8, boxShadow: theme.shadows[3] }}
                    />
                </Box>
            </Box >
        </Box >
    );
};

export default MovieDetails;