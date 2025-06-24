import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from 'react-toastify';



export const getFavourites = createAsyncThunk("favourites/getFavourites", async () => {
    const { data } = await axios.get(`https://685ad4579f6ef9611157f2d5.mockapi.io/movies/movies`);
    console.log(data);
    return data;
})

export const addFavourite = createAsyncThunk(
    "favourites/addFavourite",
    async (newFavourite) => {
        const { data } = await axios.post(`https://685ad4579f6ef9611157f2d5.mockapi.io/movies/movies`, newFavourite);
        return data;
    }
);

export const deleteFavourite = createAsyncThunk(
    "favourites/deleteFavourite",
    async (movie) => {
        await axios.delete(`https://685ad4579f6ef9611157f2d5.mockapi.io/movies/movies/${movie.id}`);
        return movie.id;
    }
);

const favouritesSlice = createSlice({
    name: "favourites",
    initialState: {
        favourites: [], isLoading: false, error: false
    },
    extraReducers: (builder) => {
        // GET favourites
        builder.addCase(getFavourites.pending, (state) => {
            state.isLoading = true;
            state.error = false;
        });
        builder.addCase(getFavourites.fulfilled, (state, action) => {
            state.favourites = action.payload;
            state.isLoading = false;
            state.error = false;
        });
        builder.addCase(getFavourites.rejected, (state) => {
            state.isLoading = false;
            state.error = true;
        });

        // POST add favourite
        builder.addCase(addFavourite.pending, (state) => {
            state.isLoading = true;
            state.error = false;
        });
        builder.addCase(addFavourite.fulfilled, (state, action) => {
            state.favourites.push(action.payload);
            state.isLoading = false;
            state.error = false;
            toast.success("Added to favourites!");
        });
        builder.addCase(addFavourite.rejected, (state) => {
            state.isLoading = false;
            state.error = true;
            toast.error("Failed to add movie to server");
        });

        // DELETE favourite
        builder.addCase(deleteFavourite.pending, (state) => {
            state.isLoading = true;
            state.error = false;
        });
        builder.addCase(deleteFavourite.fulfilled, (state, action) => {
            state.favourites = state.favourites.filter(fav => fav.id !== action.payload);
            state.isLoading = false;
            state.error = false;
            toast.error("Removed from favourites");

        });
        builder.addCase(deleteFavourite.rejected, (state) => {
            state.isLoading = false;
            state.error = true;
            toast.error("Error removing movie from favourites");

        });
    }
});

export default favouritesSlice.reducer;