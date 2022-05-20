import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { login, updateUserData } from './UserSlice';

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
    firstName: string,
    lastName: string,
    photo: string,
    displayName: string,
    description: string,
    dateOfBirth: Date,
    location: string,
}

export type EditableUserData = {
    displayName: string,
    description: string,
    location: string,
}

export const updateUserThunk = () => async (dispatch) => {
    let resultData = await fetch(`/api/User/currentUserData`)
    let userData: UserData = await resultData.json();
    dispatch(updateUserData(userData))
}

export const loginUserThunk = () => async (dispatch) => {
    let result = await fetch(`/api/User/currentUserId`)
    let id = await result.text();
    let resultData = await fetch(`/api/User/currentUserData`)
    let userData: UserData = await resultData.json();

    dispatch(login({ userId: id, userData: userData }));
}

export const subscribeToEvent = async (eventId: string) => {
    let result = await fetch(`/api/User/sign/${eventId}`, { method: "POST" })
    console.log(result)
    if (result.status !== 204)
        console.log('error while subscribing');
}

export const unsubscribeFromEvent = async (eventId: string) => {
    let result = await fetch(`/api/User/signout/${eventId}`, { method: "DELETE" })
    console.log(result)
    if (result.status !== 204)
        console.log('error while subscribing');
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

        logout: build.mutation<void, void>({
            query: () => ({
                url: 'logout',
                method: 'GET',
            }),
        }),

        register: build.mutation<null, RegisterData>({
            query: (body) => ({
                url: 'register',
                method: 'POST',
                body,
            }),
        }),

        deleteUser: build.mutation<null, void>({
            query: () => ({
                url: `deleteUser`,
                method: 'DELETE',
            })
        }),

        googleLogin: build.mutation({
            query: () => 'google-login',
        }),

        googleRegister: build.mutation({
            query: () => '',
        }),

        changeUserData: build.mutation<void, EditableUserData>({
            query: (body) => ({
                url: `changeUserData`,
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