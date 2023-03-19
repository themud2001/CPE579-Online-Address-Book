import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token") ? localStorage.getItem("token") : null;

const authSlices = createSlice({
    name: "auth",
    initialState: {
        username: null,
        token
    },
    reducers: {
        setCredentials: (state, action) => {
            state.username = action.payload.username;
            state.token = action.payload.token;
        }
    }
});

export const { setCredentials } = authSlices.actions;
export const authReducer = authSlices.reducer;