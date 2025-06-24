import React, { useContext, useEffect } from 'react';
import { WatchlistContext } from '../../context/Watchlist/WatchlistContextProvider';
import { Box, Typography, useTheme } from '@mui/material';

import Movie from '../Movie/Movie';

const Watchlist = () => {


    const { watchlist } = useContext(WatchlistContext)
    const theme = useTheme();

    useEffect(() => {
    }, [watchlist])

    return (
        <>
            {
                watchlist.length ? <Box>
                    < Typography
                        variant="h4"
                        sx={{ my: 3, color: '#FF8000', fontWeight: 'bold', textAlign: 'center' }}
                    >
                        Movie Watchlist
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2, width: { xs: '80%', md: '100%' }, margin: 'auto' }} >
                        {
                            watchlist.map((movie) => (
                                <Movie key={movie.id} movie={movie} />
                            ))
                        }
                    </Box>
                </Box > :
                    <Box sx={{ marginTop: 15 }}>
                        < Typography
                            variant="h5"
                            sx={{ my: 3, color: theme.palette.text.primary, fontWeight: 'bold', textAlign: 'center' }}
                        >
                            You haven’t added any movies to your watchlist yet.
                        </Typography>
                        < Typography
                            variant="h5"
                            sx={{ my: 3, color: theme.palette.text.primary, fontWeight: 'bold', textAlign: 'center' }}
                        >
                            Start exploring and add your favorites!
                        </Typography>
                    </Box>

            }

        </>
    );
}

export default Watchlist;
