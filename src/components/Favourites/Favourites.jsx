import React, { useEffect } from 'react';
import { Box, Typography, useTheme } from '@mui/material';

import Movie from '../Movie/Movie';
import { useSelector } from 'react-redux';

const Favourites = () => {

    const favouritesObj = useSelector(state => state.favourites.favourites);

    console.log(favouritesObj);

    const theme = useTheme();

    useEffect(() => {

    }, [favouritesObj])

    return (
        <>
            {
                favouritesObj.length ? <Box>
                    < Typography
                        variant="h4"
                        sx={{ my: 3, color: '#FF8000', fontWeight: 'bold', textAlign: 'center' }}
                    >
                        Favourite Movies
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2, width: { xs: '80%', md: '100%' }, margin: 'auto' }}>
                        {favouritesObj.map((movie) => (
                            <Movie key={movie.realID} movie={movie} />
                        ))}
                    </Box>
                </Box> :
                    <Box sx={{ marginTop: 15 }}>
                        < Typography
                            variant="h5"
                            sx={{ my: 3, color: theme.palette.text.primary, fontWeight: 'bold', textAlign: 'center' }}
                        >
                            You haven’t added any movies to your Favourites yet.
                        </Typography>
                        < Typography
                            variant="h5"
                            sx={{ my: 3, color: theme.palette.text.primary, fontWeight: 'bold', textAlign: 'center' }}
                        >
                            Start exploring and add your favorites!
                        </Typography>
                    </Box >

            }

        </>
    );
}

export default Favourites;
