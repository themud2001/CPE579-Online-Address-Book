import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { searchReducer, changeSearch } from "./slices/searchSlice";
import { authApi, useSignInMutation } from "./apis/authApi";
import { authReducer, setCredentials } from "./slices/authSlice";

const store = configureStore({
    reducer: {
        search: searchReducer,
        [authApi.reducerPath]: authApi.reducer,
        auth: authReducer
    },
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware().concat(authApi.middleware);
    }
});

setupListeners(store.dispatch);

export { store, changeSearch, useSignInMutation, setCredentials };