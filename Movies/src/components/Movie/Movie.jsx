import { Link, useLocation } from 'react-router-dom';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import AddToQueueOutlinedIcon from '@mui/icons-material/AddToQueueOutlined';
import { Box, useTheme } from '@mui/material';
import { useContext } from 'react';
import { WatchlistContext } from '../../context/Watchlist/WatchlistContextProvider';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useEffect } from 'react';
import StarRateIcon from '@mui/icons-material/StarRate';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch, useSelector } from 'react-redux';
import { addFavourite, deleteFavourite, getFavourites } from '../../redux/slices/favourites';
import { useState } from 'react';


const Movie = ({ movie }) => {


    const imgPath = "https://image.tmdb.org/t/p/w500/";
    const theme = useTheme();
    const { watchlist, addToWatchList, removeFromWatchList } = useContext(WatchlistContext)
    const location = useLocation();
    const isWatchlistPage = location.pathname === '/watchlist';

    const [favouriteColor, setFavouriteColor] = useState('white');
    const [favouriteAction, setFavouriteAction] = useState(() => addFavourite);

    const dispatch = useDispatch();

    const favouritesObj = useSelector(state => state.favourites.favourites);


    const changeFavourite = () => {

        const isFavourite = favouritesObj.some(fav => fav.id === movie.id);

        if (isFavourite) {
            setFavouriteColor('red');
            setFavouriteAction(() => deleteFavourite);
        } else {
            setFavouriteColor('white');
            setFavouriteAction(() => addFavourite);
        }
    }

    useEffect(() => {
        changeFavourite()
    }, [favouritesObj, movie.id])


    return (
        <Card sx={{
            maxWidth: 200,
            margin: 2,
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        }}>
            <CardActionArea
                component={Link}
                to={`/${movie.id}`}
            >
                <CardMedia
                    component="img"
                    image={imgPath + movie.poster_path}
                    alt={movie.original_title}
                    sx={{
                        ":hover": {
                            filter: 'brightness(95%)',
                        }
                    }}
                />
                <CardContent sx={{ height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                    <Typography gutterBottom variant="h6" component="div" sx={{ fontSize: "13px", fontWeight: 'semiBold' }}>
                        {movie.original_title}
                    </Typography>
                    <Box sx={{ display: 'flex', alignContent: 'center', alignItems: 'center' }}>
                        <StarRateIcon sx={{ color: 'orange', mx: "2px" }} />
                        {movie.vote_average.toFixed(1) || 'N/A'}
                    </Box>
                </CardContent>
            </CardActionArea>
            {
                !isWatchlistPage && <CardActions sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
                    <Button size="medium" type="button" sx={{
                        color: 'white', textTransform: 'none', backgroundColor: theme.palette.primary.main, width: '100%',
                        ":hover": {
                            backgroundColor: theme.palette.primary.dark,

                        }
                        , fontSize: 12
                    }} onClick={() => {
                        addToWatchList(movie)
                    }}>
                        <AddToQueueOutlinedIcon sx={{ marginRight: "5px", }}></AddToQueueOutlinedIcon>
                        Add To Watchlist
                    </Button>
                    <Button type="button" sx={{
                        color: favouriteColor, textTransform: 'none', backgroundColor: theme.palette.primary.main, minWidth: '2px',
                        ":hover": {
                            backgroundColor: theme.palette.primary.dark,
                        }
                    }} onClick={() => {
                        dispatch(favouriteAction(movie))
                    }}>
                        <FavoriteIcon></FavoriteIcon>
                    </Button>
                </CardActions>
            }
            {
                isWatchlistPage && <CardActions sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
                    <Button size="medium" type="button" sx={{
                        color: 'white', textTransform: 'none', backgroundColor: '#c0392b', width: '100%', fontSize: '12px',
                        ":hover": {
                            backgroundColor: '#a93226',
                        }
                    }} onClick={() => {
                        removeFromWatchList(movie)
                    }}>
                        <DeleteOutlineIcon sx={{ marginRight: 1, }}></DeleteOutlineIcon>
                        Remove From Watchlist
                    </Button>
                </CardActions>
            }
        </Card >
    );
};

export default Movie;