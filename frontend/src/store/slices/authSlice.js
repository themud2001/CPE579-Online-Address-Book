import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token") ? localStorage.getItem("token") : null;

const authSlices = createSlice({
    name: "auth",
    initialState: {
        username: null,
        token
    },
    reducers: {
        signOut: state => {
            localStorage.removeItem("token");
            state.username = null;
            state.token = null;
        },
        setCredentials: (state, action) => {
            state.username = action.payload.username;
            state.token = action.payload.token;
        }
    }
});

export const { signOut, setCredentials } = authSlices.actions;
export const authReducer = authSlices.reducer;