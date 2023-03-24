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
                },
                invalidatesTags: ["Record"]
            }),
            editRecord: builder.mutation({
                query: ({ formData, token }) => {
                    return {
                        url: "/",
                        method: "PUT",
                        headers: { authorization: `Bearer ${token}` },
                        body: formData
                    };
                },
                invalidatesTags: ["Record"]
            }),
            deleteRecord: builder.mutation({
                query: ({ id, token }) => {
                    return {
                        url: `/${id}`,
                        method: "DELETE",
                        headers: { authorization: `Bearer ${token}` }
                    };
                },
                invalidatesTags: ["Record"]
            }),
            fetchRecords: builder.query({
                query: ({ page=1, search }) => {
                    if (!search || search.trim() === "") {
                        return {
                            url: `/?page=${page}`
                        };
                    }

                    const email = localStorage.getItem("email");
                    let url = `/${search}`;

                    if (email) {
                        url = url + `?email=${email}`;
                    }
                    
                    return { url };
                },
                providesTags: ["Record"]
            })
        };
    }
});

export const {
    useAddRecordMutation,
    useEditRecordMutation,
    useDeleteRecordMutation,
    useFetchRecordsQuery
} = recordsApi;
export { recordsApi };