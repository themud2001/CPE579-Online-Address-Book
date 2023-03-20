import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const recordsApi = createApi({
    reducerPath: "recordsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BACKEND_RECORDS_URL
    }),
    endpoints: builder => {
        return {
            addRecord: builder.mutation({
                query: formData => {
                    return {
                        url: "/",
                        method: "POST",
                        body: formData
                    };
                }
            }),
            fetchRecords: builder.query({
                query: () => {
                    return {
                        url: "/",
                        method: "GET"
                    };
                }
            })
        };
    }
});

export const { useAddRecordMutation, useFetchRecordsQuery } = recordsApi;
export { recordsApi };