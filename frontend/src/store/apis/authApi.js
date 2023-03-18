import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3090/auth/"
    }),
    endpoints: builder => {
        return {
            signIn: builder.mutation({
                query: formData => {
                    return {
                        url: "/signin",
                        method: "POST",
                        body: {
                            username: formData.username,
                            password: formData.password
                        }
                    };
                }
            })
        };
    }
});

export const { useSignInMutation } = authApi;
export { authApi };