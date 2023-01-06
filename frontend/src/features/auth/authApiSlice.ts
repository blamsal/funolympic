import { apiSlice } from '../../app/api/apiSlice';
import { Profile } from '../profile/profileApiSlice';

interface AuthTokens {
    access: string;
    refresh: string;
}

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation<AuthTokens, {email: string; password: string}>({
            query: credentials => ({
                url: "/api/auth/",
                method: "POST",
                body: { ...credentials }
            })
        }),
        register: builder.mutation<Profile, {email: string, name: string, password: string}>({
            query: (payload) => ({
                url: "api/auth/register/",
                method: "POST",
                body: payload,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }),
        })
    })
})

export const { useLoginMutation, useRegisterMutation } = authApiSlice;