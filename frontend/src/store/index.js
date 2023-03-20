import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { searchReducer, changeSearch } from "./slices/searchSlice";
import { authApi, useSignInMutation, useFetchAccountDetailsQuery } from "./apis/authApi";
import { authReducer, signOut } from "./slices/authSlice";
import { recordsApi, useFetchRecordsQuery } from "./apis/recordsApi";

const store = configureStore({
    reducer: {
        search: searchReducer,
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [recordsApi.reducerPath]: recordsApi.reducer
    },
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(recordsApi.middleware);
    }
});

setupListeners(store.dispatch);

export {
    store,
    changeSearch,
    useSignInMutation,
    useFetchAccountDetailsQuery,
    signOut,
    useFetchRecordsQuery
};