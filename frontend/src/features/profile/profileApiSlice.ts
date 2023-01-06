import { apiSlice } from '../../app/api/apiSlice';

export interface Profile {
    id: string;
    email: string;
    name: string;
}

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getProfileById: builder.query<Profile, { id: string }>({
            query: ({id}) => ({
                url: `/api/users/${id}/`,
                method: "GET",
                redirect: "follow"
            })
        }),
        updateProfile: builder.mutation<Profile, {id: string; email: string, name: string, password: string}>({
            query: (payload) => ({
                url: `api/users/${payload.id}/update/`,
                method: "PUT",
                body: payload,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }),
        })
    })
})

export const { useGetProfileByIdQuery, useUpdateProfileMutation } = userApiSlice;