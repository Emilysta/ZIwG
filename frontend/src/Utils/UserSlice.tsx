import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type LoginData = {
    username: string,
    password: string,
}

export type RegisterData = {
    firstName: string,
    lastName: string,
    password: string,
    displayName: string,
    dateOfBirth: Date,
    email: string,
}

export type UserData = {
    displayName: string,
    description: string,
    location: string,
}

export const userApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://ziwg.toadres.pl/api/User/',
    }),
    endpoints: (build) => ({
        login: build.mutation<null, LoginData>({
            query: (body) => ({
                url: 'login',
                method: 'POST',
                body,
            }),
        }),
        register: build.mutation<null, RegisterData>({
            query: (body) => ({
                url: 'register',
                method: 'POST',
                body,
            }),
        }),

        deleteUser: build.mutation<null, string>({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            })
        }),

        googleLogin: build.mutation({
            query: () => 'google-login',
        }),
        googleRegister: build.mutation({
            query: () => '',
        }),
        getUserData: build.query<UserData, void>({
            query: () => ''
        }),
        changeUserData: build.mutation<UserData, string>({
            query: (body) => ({
                url: `changeUserData/${body}`,
                method: 'PATCH',
                body,
            }),
        }),

        subscribeToEvent: build.mutation<null, string>({
            query: (body) => ({
                url: `sign/${body}`,
                method: 'POST',
            })
        }),

        unsubscribeFromEvent: build.mutation<null, string>({
            query: (body) => ({
                url: `signout/${body}`,
                method: 'DELETE',
            })
        }),

        joinRide: build.mutation<null, string>({
            query: (body) => ({
                url: `joinRide/${body}`,
                method: 'POST',
            })
        }),

        leaveRide: build.mutation<null, string>({
            query: (body) => ({
                url: `leaveRide/${body}`,
                method: 'DELETE',
            })
        }),


    }),
})
export const { useLoginMutation, useRegisterMutation, useGoogleLoginMutation, useGoogleRegisterMutation } = userApi;