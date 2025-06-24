import { configureStore } from "@reduxjs/toolkit";
import favouritesReducer from "../slices/favourites";

const store = configureStore({
    reducer: {
        favourites: favouritesReducer
    }
})

export default store;