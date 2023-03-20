import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const recordsApi = createApi({
    reducerPath: "recordsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BACKEND_RECORDS_URL
    }),
    endpoints: builder => {
        return {
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

export const { useFetchRecordsQuery } = recordsApi;
export { recordsApi };