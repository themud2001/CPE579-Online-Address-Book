import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchValue: "",
    nearestLocation: false
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        changeSearch: (state, action) => {
            state.searchValue = action.payload.searchValue;
            state.nearestLocation = action.payload.nearestLocation;
        }
    }
});

export const { changeSearch } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;