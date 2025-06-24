import { Link, useLocation } from 'react-router-dom';
import * as React from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    CardActionArea,
    CardActions,
    Box,
    useTheme,
} from '@mui/material';

import AddToQueueOutlinedIcon from '@mui/icons-material/AddToQueueOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import StarRateIcon from '@mui/icons-material/StarRate';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { useContext } from 'react';
import { WatchlistContext } from '../../context/Watchlist/WatchlistContextProvider';
import { useDispatch, useSelector } from 'react-redux';
import { addFavourite, deleteFavourite } from '../../redux/slices/favourites';

const Movie = ({ movie }) => {
    const imgPath = "https://image.tmdb.org/t/p/w500/";
    const theme = useTheme();
    const location = useLocation();
    const isWatchlistPage = location.pathname === '/watchlist';

    const dispatch = useDispatch();
    const { watchlist, addToWatchList, removeFromWatchList } = useContext(WatchlistContext);
    const favouritesObj = useSelector(state => state.favourites.favourites);

    const watchlistID = movie.realID || movie.id;
    const tmdbID = movie.realID || movie.id;

    const isInWatchlist = watchlist.some(item => (item.realID || item.id) == watchlistID);
    const isFavourite = favouritesObj.some(fav => fav.realID == tmdbID);

    const handleWatchlistToggle = () => {
        if (isInWatchlist) {
            const matched = watchlist.find(item => (item.realID || item.id) == watchlistID);
            if (matched) {
                removeFromWatchList(matched);
            }
        } else {
            addToWatchList({ ...movie, realID: watchlistID });
        }
    };

    const handleFavouriteToggle = () => {
        if (isFavourite) {
            const matchedFav = favouritesObj.find(fav => fav.realID == tmdbID);
            if (matchedFav) {
                dispatch(deleteFavourite(matchedFav));
            }
        } else {
            dispatch(addFavourite({ ...movie, realID: tmdbID }));
        }
    };

    return (
        <Box sx={{
            width: { xs: '85%', sm: 'calc(50% - 16px)', md: 'calc(33.33% - 16px)', lg: 235 },
            margin: { xs: '8px 0', sm: 2 },
            paddingX: { xs: 10, sm: 0 },
        }}>
            <Card sx={{ width: '100%', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <CardActionArea component={Link} to={`/${movie.realID || movie.id}`}>
                    <CardMedia
                        component="img"
                        image={imgPath + movie.poster_path}
                        alt={movie.original_title}
                        sx={{ ":hover": { filter: 'brightness(95%)' } }}
                    />
                    <CardContent sx={{
                        height: '30px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                        <Typography
                            gutterBottom
                            variant="h6"
                            component="div"
                            sx={{ fontSize: "13px", fontWeight: 'semiBold' }}
                        >
                            {movie.original_title}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <StarRateIcon sx={{ color: 'orange', mx: "2px" }} />
                            {movie.vote_average?.toFixed(1) || 'N/A'}
                        </Box>
                    </CardContent>
                </CardActionArea>

                {/* Actions */}
                {!isWatchlistPage ? (
                    <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                            size="medium"
                            sx={{
                                color: 'white',
                                backgroundColor: isInWatchlist ? '#c0392b' : theme.palette.primary.main,
                                textTransform: 'none',
                                width: '100%',
                                fontSize: 11,
                                ":hover": {
                                    backgroundColor: isInWatchlist ? '#a93226' : theme.palette.primary.dark,
                                }
                            }}
                            onClick={handleWatchlistToggle}
                        >
                            <AddToQueueOutlinedIcon sx={{ marginRight: "5px" }} />
                            {isInWatchlist ? 'Remove From Watchlist' : 'Add To Watchlist'}
                        </Button>

                        <Button
                            sx={{
                                color: isFavourite ? 'red' : 'white',
                                backgroundColor: theme.palette.primary.main,
                                textTransform: 'none',
                                minWidth: '2px',
                                ":hover": {
                                    backgroundColor: theme.palette.primary.dark,
                                }
                            }}
                            onClick={handleFavouriteToggle}
                        >
                            <FavoriteIcon />
                        </Button>
                    </CardActions>
                ) : (
                    <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                            size="medium"
                            sx={{
                                color: 'white',
                                backgroundColor: '#c0392b',
                                width: '100%',
                                fontSize: '12px',
                                textTransform: 'none',
                                ":hover": {
                                    backgroundColor: '#a93226',
                                }
                            }}
                            onClick={() => removeFromWatchList(movie)}
                        >
                            <DeleteOutlineIcon sx={{ marginRight: 1 }} />
                            Remove From Watchlist
                        </Button>
                    </CardActions>
                )}
            </Card>
        </Box>
    );
};

export default Movie;