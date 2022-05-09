import { configureStore } from '@reduxjs/toolkit';
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query';
import { eventApi } from './EventAPISlice';
import { userApi } from './UserApiSlice';
import { userLoginSlice } from './UserSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { nominatimApi } from './NominatimAPISlice';

const reducer = {
    [eventApi.reducerPath]: eventApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [nominatimApi.reducerPath]: nominatimApi.reducer,
    userLogin: userLoginSlice.reducer
}

export const store = configureStore({
    reducer,
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(eventApi.middleware).concat(userApi.middleware).concat(nominatimApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)