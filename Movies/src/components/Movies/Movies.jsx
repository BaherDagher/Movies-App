import React, { useContext, useEffect } from 'react';
import Movie from '../Movie/Movie';
import './Movies.css';
import Navbar from '../Navbar/Navbar';
import { MoviesContext } from '../../context/Movies/MoviesContextProvider';
import { Box, Typography, useTheme } from '@mui/material';
import Loader from '../Loader/Loader';
import Slider from 'react-slick';

const Movies = () => {

    const { moviesObj } = useContext(MoviesContext);
    const theme = useTheme();


    if (!moviesObj) return <Loader />;

    const featuredMovies = moviesObj.slice(25, 35);

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 2,
        arrows: true,
        swipe: true,
        draggable: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <>
            <Box sx={{ px: 13 }}>
                <Typography variant="h5" textAlign="left" mt={4} mb={2} mx={2} sx={{
                    color: '#FF8000', fontWeight: 'bold'
                }}>
                    Featured Today
                </Typography>
                <Box sx={{ mb: 5 }}>
                    <Slider {...sliderSettings} >
                        {featuredMovies.map((movie) => (
                            <Movie key={movie.id} movie={movie} />
                        ))}
                    </Slider>
                </Box>

                <Typography variant="h5" textAlign="left" mt={2} mb={2} mx={2} sx={{ color: '#FF8000', fontWeight: 'bold' }}>
                    All Movies
                </Typography>
            </Box >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    padding: '10px',
                    backgroundColor: 'background.default',
                }}
            >
                {moviesObj.map((movie) => (
                    <Movie key={movie.id} movie={movie} />
                ))}
            </Box>
        </>
    );
};

export default Movies;