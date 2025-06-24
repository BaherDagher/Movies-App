import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';

const Loader = () => {
    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: 'background.default',
                color: 'text.primary',
            }}
        >
            <MovieIcon sx={{ fontSize: 60, mb: 2, color: '#6c5ce7' }} />
            <CircularProgress color="primary" />
            <Typography variant="h6" sx={{ mt: 2 }}>
                Loading movies...
            </Typography>
        </Box>
    );
};

export default Loader;