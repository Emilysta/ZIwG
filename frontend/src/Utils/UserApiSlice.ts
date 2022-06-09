import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { eventApi } from './EventAPISlice';
import { login, logout, updateUserData } from './UserSlice';

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
    organises: number,
    attends: number,
}

export type EditableUserData = {
    displayName: string,
    description: string,
    location: string,
}

export const loginUserThunk = (id: string) => async (dispatch) => {
    let resultData = await fetch(`/api/User/currentUserData`)
    let userData: UserData = await resultData.json();

    dispatch(login({ userId: id, userData: userData }));
}

export const userApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/User/',
    }),
    reducerPath: 'userApi',
    tagTypes: ['User'],
    endpoints: (build) => ({
        login: build.mutation<string, LoginData>({
            query: (body) => ({
                url: 'login',
                method: 'POST',
                body,
                responseHandler: (response) => response.text()
            }),
            invalidatesTags: ['User'],
        }),

        logout: build.mutation<void, void>({
            query: () => ({
                url: 'logout',
                method: 'GET',
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(logout());
                } catch (err) {
                    console.log('Error while updating data!');
                }
            },
        }),

        getUserData: build.query<UserData, void>({
            query: () => ({
                url: 'currentUserData',
            }),
            providesTags: ['User'],
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    await dispatch(updateUserData(data));
                } catch (err) {
                    console.log(err)
                    console.log('Error while updating data!');
                }
            },
        }),

        register: build.mutation<null, RegisterData>({
            query: (body) => ({
                url: 'register',
                method: 'POST',
                body,
            }),
        }),

        resetPassword: build.query<null, { userEmail: string, password: string, token: string }>({
            query: (body) => ({
                url: 'resetPassword',
                method: 'POST',
                body,
            }),
        }),

        sendPasswordRecoveryEmail: build.query<null, { userEmail: string }>({
            query: (body) => ({
                url: `sendPasswordRecoveryEmail/${body.userEmail}`,
                method: 'POST',
            }),
        }),

        getTicket: build.query<null, { id: string }>({
            query: (body) => ({
                url: `generateTicket/${body.id}`
            }),
        }),

        deleteUser: build.mutation<null, void>({
            query: () => ({
                url: `deleteUser`,
                method: 'DELETE',
            })
        }),

        googleLogin: build.mutation({
            query: () => ({
                url: 'google-login',
                method: 'GET',
                mode: 'no-cors',
                headers: { 'Access-Control-Allow-Origin': '*' }
            })
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
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(updateUserData(body))
                } catch (err) {
                    console.log('Error while updating data!');
                }
            },
        }),

        subscribeToEvent: build.mutation<null, { eventId: string }>({
            query: (body) => ({
                url: `sign/${body.eventId}`,
                method: 'POST',
            }),
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(eventApi.util.invalidateTags(["Event"]));
                } catch (err) {
                    console.log('Error while updating data!');
                }
            },
        }),
        unsubscribeFromEvent: build.mutation<null, { eventId: string }>({
            query: (body) => ({
                url: `signout/${body.eventId}`,
                method: 'DELETE',
            }),
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(eventApi.util.invalidateTags(["Event"]));
                } catch (err) {
                    console.log('Error while updating data!');
                }
            },
        }),
    })
})
export const { useLoginMutation, useRegisterMutation, useGoogleLoginMutation, useGoogleRegisterMutation, useChangeUserDataMutation, useLazyResetPasswordQuery, useLazySendPasswordRecoveryEmailQuery, useLazyGetTicketQuery, useSubscribeToEventMutation, useUnsubscribeFromEventMutation, useLazyGetUserDataQuery } = userApi;