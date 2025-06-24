import React, { useContext, useState } from 'react';
import {
    Box,
    TextField,
    Typography,
    useTheme,
    InputLabel,
    MenuItem,
    FormControl,
    Select
} from '@mui/material';
import { MoviesContext } from '../../context/Movies/MoviesContextProvider';
import Movie from '../Movie/Movie';

const Search = () => {
    const { moviesObj } = useContext(MoviesContext);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [Category, setCategory] = useState('Name');

    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    const handleSearch = (event) => {
        const searchValue = event.target.value.toLowerCase().trim();
        if (searchValue === '') return setFilteredMovies([]);

        const matchedData = moviesObj.filter((movie) => {
            if (Category === 'Name') {
                return movie.original_title.toLowerCase().includes(searchValue);
            } else if (Category === 'Rating') {
                return movie.vote_average.toString().startsWith(searchValue);
            }
            return false;
        });

        setFilteredMovies(matchedData);
    };

    return (
        <>
            <Box
                sx={{
                    px: { xs: 2, sm: 4, md: 10, lg: 13 },
                    mx: { xs: 1, sm: 2 },
                }}
            >
                <Typography
                    variant="h5"
                    textAlign="left"
                    mt={4}
                    mb={2}
                    sx={{ color: '#FF8000', fontWeight: 'bold' }}
                >
                    Search Movie
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: 'center',
                        justifyContent: 'start',
                        gap: 2,
                    }}
                >
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        sx={{ width: { xs: '100%', sm: '70%' } }}
                        onChange={handleSearch}
                        placeholder={`Search by ${Category}`}
                    />

                    <FormControl sx={{ width: { xs: '100%', sm: '30%' } }}>
                        <InputLabel id="search-category-label">Search By</InputLabel>
                        <Select
                            labelId="search-category-label"
                            id="search-category"
                            value={Category}
                            label="Search By"
                            onChange={handleChange}
                        >
                            <MenuItem value="Name">Name</MenuItem>
                            <MenuItem value="Rating">Rating</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Box>

            {filteredMovies.length > 0 && (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        padding: '10px',
                        backgroundColor: 'background.default',
                    }}
                >
                    {filteredMovies.map((movie) => (
                        <Movie key={movie.id} movie={movie} />
                    ))}
                </Box>
            )}
        </>
    );
};

export default Search;