import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BACKEND_AUTH_URL
    }),
    endpoints: builder => {
        return {
            signIn: builder.mutation({
                query: formData => {
                    return {
                        url: "/signin",
                        method: "POST",
                        body: formData
                    };
                }
            }),
            fetchAccountDetails: builder.query({
                query: token => {
                    return {
                        url: "/account-details",
                        method: "GET",
                        headers: { "Authorization": `Bearer ${token}` }
                    };
                }
            })
        };
    }
});

export const { useSignInMutation, useFetchAccountDetailsQuery } = authApi;
export { authApi };