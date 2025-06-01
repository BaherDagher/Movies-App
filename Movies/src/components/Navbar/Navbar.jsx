import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, NavLink } from 'react-router-dom';
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';
import { ThemeContext } from '../../context/Theme/ThemeContextProvider';
import { useContext } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Badge, useTheme } from '@mui/material';
import { ToastContainer } from 'react-toastify'
import { WatchlistContext } from '../../context/Watchlist/WatchlistContextProvider';
import { useSelector } from 'react-redux';
import FavoriteIcon from '@mui/icons-material/Favorite';


const Navbar = () => {

    const { isDarkMode, toggleTheme } = useContext(ThemeContext);
    const { watchlist } = useContext(WatchlistContext)
    const favouritesObj = useSelector(state => state.favourites.favourites);
    const theme = useTheme();


    const navLinkStyle = ({ isActive }) => ({
        textDecoration: isActive ? 'underline' : 'none',
        color: isActive ? theme.palette.primary.main : theme.palette.text.primary,
    });

    return (
        <>
            <Box sx={{ marginBottom: 8 }}>
                <AppBar position="fixed" sx={{
                    left: 0,
                    right: 0,
                    top: 0,
                    zIndex: 1,
                    color: 'black',
                    backgroundColor: theme.palette.background.default,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                    paddingX: 11
                }} >
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >

                        <Box component={Link} to="/" sx={{ display: 'flex', minWidth: '150px', textDecoration: 'none' }}>
                            <LiveTvOutlinedIcon sx={{
                                color: theme.palette.primary.main,
                                fontSize: '40px',
                                mr: 1,
                                position: 'relative',
                                top: '-3px'
                            }}></LiveTvOutlinedIcon>
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{
                                    fontWeight: 'bold',
                                    letterSpacing: '2px',
                                    color: theme.palette.text.primary,
                                }}
                            >
                                Movies
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 3 }}>
                            <NavLink to="/" style={navLinkStyle}>
                                Home
                            </NavLink>
                            <NavLink to="/genres" style={navLinkStyle}>
                                Genres
                            </NavLink>
                            <NavLink to="/search" style={navLinkStyle}>
                                Search
                            </NavLink>
                            <NavLink to="/watchlist" style={navLinkStyle}>
                                <Badge badgeContent={watchlist.length == 0 ? "0" : watchlist.length} color="primary">
                                    Watchlist
                                </Badge>
                            </NavLink>
                            <NavLink to="/favourites" style={navLinkStyle} >
                                <Badge badgeContent={favouritesObj.length == 0 ? "0" : favouritesObj.length} color="primary">
                                    <FavoriteIcon sx={{ fontSize: 25 }}></FavoriteIcon>
                                </Badge>
                            </NavLink>

                        </Box>

                        <FormControlLabel
                            label={isDarkMode ? "Dark Mode" : "Light Mode"}
                            labelPlacement="start"
                            control={<Switch checked={isDarkMode} onClick={toggleTheme} size="small" />}
                            sx={{
                                color: theme.palette.text.primary, '& .MuiFormControlLabel-label': {
                                    fontSize: '14px',
                                }
                            }}
                        />
                    </Toolbar>
                </AppBar >
            </Box >
            <ToastContainer position="top-right" autoClose={1000} theme={isDarkMode ? 'dark' : 'light'} />

        </>


    );
}

export default Navbar;
