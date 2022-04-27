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
        login: build.mutation<LoginData, void>({
            query: (body) => ({
                url: 'login',
                method: 'POST',
                body,
            }),
        }),
        register: build.mutation<RegisterData, void>({
            query: (body) => ({
                url: 'register',
                method: 'POST',
                body,
            }),
        }),

        deleteUser: build.mutation<string, void>({
            query: (body) => ({
                url: `/${body}`,
                method: 'DELETE',
                body,
            })
        }),

        googleLogin: build.query({
            query: () => 'google-login',
        }),
        googleRegister: build.query({
            query: () => '',
        }),
        getUserData: build.query<UserData, void>({
            query: () => ''
        }),
        changeUserData: build.mutation<UserData, Omit<UserData, 'userId'>>({
            query: (body) => ({
                url: `changeUserData/${body}`,
                method: 'PATCH',
                body,
            }),
        }),

        subscribeToEvent: build.mutation<string, void>({
            query: (body) => ({
                url: `sign/${body}`,
                method: 'POST',
                body,
            })
        }),

        unsubscribeFromEvent: build.mutation<string, void>({
            query: (body) => ({
                url: `signout/${body}`,
                method: 'DELETE',
                body,
            })
        }),

        joinRide: build.mutation<string, void>({
            query: (body) => ({
                url: `joinRide/${body}`,
                method: 'POST',
                body,
            })
        }),

        leaveRide: build.mutation<string, void>({
            query: (body) => ({
                url: `leaveRide/${body}`,
                method: 'DELETE',
                body,
            })
        }),


    }),
})
export const { useLoginMutation } = userApi;