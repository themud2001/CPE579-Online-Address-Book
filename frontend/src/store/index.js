import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { searchReducer, changeSearch } from "./slices/searchSlice";
import { authApi, useSignInMutation, useFetchAdminDetailsQuery } from "./apis/authApi";
import { authReducer, signOut, setCredentials } from "./slices/authSlice";

const store = configureStore({
    reducer: {
        search: searchReducer,
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer
    },
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware().concat(authApi.middleware);
    }
});

setupListeners(store.dispatch);

export {
    store,
    changeSearch,
    useSignInMutation,
    useFetchAdminDetailsQuery,
    signOut,
    setCredentials
};