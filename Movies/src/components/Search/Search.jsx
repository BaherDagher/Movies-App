import React, { useContext } from 'react';
import { Box, TextField, Typography, useTheme } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import { MoviesContext } from '../../context/Movies/MoviesContextProvider';
import Movie from '../Movie/Movie';


const Search = () => {

    const { moviesObj } = useContext(MoviesContext);
    console.log(moviesObj);

    const [filteredMovies, setFilteredMovies] = useState([])

    const [Category, setCategory] = useState('Name');

    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    const handleSearch = (event) => {
        const searchValue = event.target.value.toLowerCase().trim();

        if (searchValue === '') {
            setFilteredMovies([]);
            return;
        }

        const matchedData = moviesObj.filter((movie) => {
            if (Category === 'Name') {
                return movie.original_title.toLowerCase().includes(searchValue);
            }
            else if (Category === 'Rating') {
                const voteStr = movie.vote_average.toString();
                return voteStr.startsWith(searchValue);
            }

            return false;
        });

        setFilteredMovies(matchedData);
    };
    // if (!filteredMovies.length) return <Loader />;

    return (
        <>
            <Box sx={{ px: 13, mx: 2 }}>
                <Typography variant="h5" textAlign="left" mt={4} mb={2} sx={{
                    color: '#FF8000', fontWeight: 'bold'
                }}>
                    Search Movie
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                    <TextField id="outlined-basic" variant="outlined" sx={{ width: '80%' }} onChange={handleSearch} />
                    <Box sx={{ minWidth: 200, mx: 4 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Search By</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={Category}
                                label="Search By"
                                onChange={handleChange}
                            >
                                <MenuItem value={'Name'}>Name</MenuItem>
                                <MenuItem value={'Rating'}>Rating</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
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
                {filteredMovies?.map((movie) => (
                    <Movie key={movie.id} movie={movie} />
                ))}
            </Box>

        </>
    );
}

export default Search;
