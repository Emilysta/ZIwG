import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type LoginData = {
    email: string,
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
        baseUrl: '/api/User/',
    }),
    reducerPath: 'userApi',
    tagTypes: ['Event', 'User'],
    endpoints: (build) => ({
        login: build.mutation<null, LoginData>({
            query: (body) => ({
                url: 'login',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['User'],
        }),

        register: build.mutation<null, RegisterData>({
            query: (body) => ({
                url: 'register',
                method: 'POST',
                body,
            }),
        }),

        getCurrentUserId: build.query<string, void>({
            query: () => 'currentUserId',
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
export const { useLoginMutation, useRegisterMutation, useGoogleLoginMutation, useGoogleRegisterMutation, useGetUserDataQuery, useGetCurrentUserIdQuery } = userApi;