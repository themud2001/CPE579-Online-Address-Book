import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const recordsApi = createApi({
    reducerPath: "recordsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BACKEND_RECORDS_URL
    }),
    endpoints: builder => {
        return {
            addRecord: builder.mutation({
                query: ({ formData, token }) => {
                    return {
                        url: "/",
                        method: "POST",
                        headers: { authorization: `Bearer ${token}` },
                        body: formData
                    };
                }
            }),
            fetchRecords: builder.query({
                query: page => `/?page=${page}`
            })
        };
    }
});

export const { useAddRecordMutation, useFetchRecordsQuery } = recordsApi;
export { recordsApi };