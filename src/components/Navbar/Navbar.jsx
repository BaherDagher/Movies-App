import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, NavLink } from 'react-router-dom';
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';
import { useContext, useState } from 'react';
import Switch from '@mui/material/Switch';
import { Badge, useTheme, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import { WatchlistContext } from '../../context/Watchlist/WatchlistContextProvider';
import { useSelector } from 'react-redux';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MenuIcon from '@mui/icons-material/Menu';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { ThemeContext } from '../../context/Theme/ThemeContextProvider';

const Navbar = () => {
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);
    const { watchlist } = useContext(WatchlistContext);
    const favouritesObj = useSelector((state) => state.favourites.favourites);
    const theme = useTheme();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const navLinkStyle = ({ isActive }) => ({
        textDecoration: isActive ? 'underline' : 'none',
        color: isActive ? theme.palette.primary.main : theme.palette.text.primary,
        fontSize: 18,
        fontWeight: 500,
    });

    const drawerLinks = (
        <Box
            sx={{ width: 240 }}
            role="presentation"
            onClick={() => setDrawerOpen(false)}
            onKeyDown={() => setDrawerOpen(false)}
        >
            <List>
                <ListItem button component={NavLink} to="/" style={navLinkStyle}>
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button component={NavLink} to="/genres" style={navLinkStyle}>
                    <ListItemText primary="Genres" />
                </ListItem>
                <ListItem button component={NavLink} to="/search" style={navLinkStyle}>
                    <ListItemText primary="Search" />
                </ListItem>
                <ListItem button component={NavLink} to="/watchlist" style={navLinkStyle}>
                    <Badge badgeContent={watchlist.length || '0'} color="primary">
                        <ListItemText primary="Watchlist" />
                    </Badge>
                </ListItem>
                <ListItem button component={NavLink} to="/favourites" style={navLinkStyle}>
                    <Badge badgeContent={favouritesObj.length || '0'} color="primary">
                        <FavoriteIcon sx={{ mr: 1 }} />
                    </Badge>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <>
            <Box sx={{ marginBottom: 8 }}>
                <AppBar
                    position="fixed"
                    sx={{
                        left: 0,
                        right: 0,
                        top: 0,
                        zIndex: '999',
                        color: theme.palette.text.primary,
                        backgroundColor: theme.palette.background.default,
                        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                        px: { xs: 2, sm: 3, md: 5, lg: 8 },
                    }}
                >
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box
                            component={Link}
                            to="/"
                            sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', minWidth: '150px' }}
                        >
                            <LiveTvOutlinedIcon
                                sx={{
                                    color: theme.palette.primary.main,
                                    fontSize: '40px',
                                    mr: 1,
                                    position: 'relative',
                                    top: '-3px',
                                }}
                            />
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{
                                    fontWeight: 'bold',
                                    letterSpacing: '2px',
                                    color: theme.palette.text.primary,
                                    fontSize: { xs: 16, md: 20 },
                                }}
                            >
                                DagherMovies
                            </Typography>
                        </Box>

                        {/* Desktop Nav Links */}
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
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
                                <Badge badgeContent={watchlist.length || '0'} color="primary">
                                    Watchlist
                                </Badge>
                            </NavLink>
                            <NavLink to="/favourites" style={navLinkStyle}>
                                <Badge badgeContent={favouritesObj.length || '0'} color="primary">
                                    <FavoriteIcon sx={{ fontSize: 25 }} />
                                </Badge>
                            </NavLink>
                        </Box>

                        {/* Desktop Toggle */}
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
                            <IconButton onClick={toggleTheme} sx={{ color: theme.palette.text.primary }}>
                                {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
                            </IconButton>
                        </Box>

                        {/* Mobile Icons */}
                        <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
                            <IconButton onClick={toggleTheme} sx={{ color: theme.palette.text.primary, mr: 1 }}>
                                {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
                            </IconButton>
                            <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: theme.palette.text.primary }}>
                                <MenuIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>

                <Drawer
                    anchor="right"
                    open={drawerOpen}
                    onClose={() => setDrawerOpen(false)}
                    PaperProps={{ sx: { backgroundColor: theme.palette.background.default } }}
                >
                    {drawerLinks}
                </Drawer>
            </Box>
            <ToastContainer position="top-right" autoClose={1000} theme={isDarkMode ? 'dark' : 'light'} />
        </>
    );
};

export default Navbar;