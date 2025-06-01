import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Box, Card, CardActionArea, CardContent, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';

const Genres = () => {

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const [genres, setGenres] = useState([]);
    const [selectedGenreId, setSelectedGenreId] = useState(null);
    const theme = useTheme();

    const getMoviesGenres = async () => {
        const { data } = await axios.get(`${API_BASE_URL}/genres`);
        setGenres(data);
    };

    useEffect(() => {
        getMoviesGenres();
    }, []);

    if (!genres.length) return <Loader />;

    return (

        <Box sx={{ px: 2, py: 4, backgroundColor: theme.palette.background.default }}>
            <Typography
                variant="h4"
                sx={{ mb: 3, color: '#FF8000', fontWeight: 'bold', textAlign: 'center' }}
            >
                All Genres
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2, mb: 4 }}>
                {genres.map((genre) => (
                    <Card
                        key={genre.id}
                        sx={{
                            width: 160,
                            textAlign: 'center',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                            border: genre.id === selectedGenreId ? `2px solid ${theme.palette.primary.main}` : 'none',
                        }}
                    >
                        <CardActionArea
                            component={Link}
                            to={`/selected-genre/${genre.id}?name=${encodeURIComponent(genre.name)}`}
                            onClick={() => setSelectedGenreId(genre.id)}
                        >
                            <CardContent>
                                <Typography variant="subtitle1" sx={{ color: theme.palette.text.primary }}>
                                    {genre.name}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default Genres;