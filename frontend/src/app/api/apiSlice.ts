import {
  BaseQueryApi,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

import {
  logout,
  setCredentials,
} from '../../features/auth/authSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL || "http://127.0.0.1:8000",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const auth = (getState() as any).auth;
        const token = auth.access;
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        console.log(process.env.REACT_APP_API_URL)
        return headers
    }
})

const baseQueryWithReauth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 403) {
        console.log("sending refresh token");

        const refreshResult = await baseQuery("/api/auth/refresh/", api, extraOptions);
        console.log(refreshResult);

        if (refreshResult?.data) {
            // const user = (api.getState() as any).auth
            console.log("refresh data", refreshResult.data);
            api.dispatch(setCredentials({...refreshResult.data}))

            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logout(api.getState()))
        }
    }

    return result;
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})
