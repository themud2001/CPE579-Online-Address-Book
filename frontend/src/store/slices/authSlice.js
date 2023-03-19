import { createSlice } from "@reduxjs/toolkit";

import { authApi } from "../apis/authApi";

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
        }
    },
    extraReducers: builder => {
        builder
            .addMatcher(authApi.endpoints.signIn.matchFulfilled, (state, action) => {
                localStorage.setItem("token", action.payload.token);
                state.username = action.payload.username;
                state.token = action.payload.token;
            })
            .addMatcher(authApi.endpoints.fetchAccountDetails.matchFulfilled, (state, action) => {
                state.username = action.payload.username;
            });
    }
});

export const { signOut } = authSlices.actions;
export const authReducer = authSlices.reducer;