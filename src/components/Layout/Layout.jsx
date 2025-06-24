import React, { useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { Box, useTheme } from '@mui/material';
import Footer from '../Footer/Footer';
import { useDispatch } from 'react-redux';
import { getFavourites } from '../../redux/slices/favourites';


const Layout = () => {

    const theme = useTheme();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFavourites())
    }, [dispatch])

    return (
        <>
            <Box sx={{
                backgroundColor: theme.palette.background.default, display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                overflowX: 'hidden',
            }}>
                <Navbar />
                <Box sx={{ flexGrow: 1, justifySelf: 'start' }}>
                    <Outlet />
                </Box>
                <Footer />
            </Box>

        </>
    );
}

export default Layout;
