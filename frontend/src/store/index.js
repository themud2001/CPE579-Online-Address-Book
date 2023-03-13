import { configureStore } from "@reduxjs/toolkit";
import { searchReducer, changeSearch } from "./slices/searchSlice";

const store = configureStore({
    reducer: {
        search: searchReducer
    }
});

export { store, changeSearch };