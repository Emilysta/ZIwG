import { configureStore } from '@reduxjs/toolkit';
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query';
import { myApi } from './APISlice';
import { userApi } from './UserSlice';
import { userLoginSlice } from './UserLoginSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const reducer = {
    [myApi.reducerPath]: myApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    userLogin: userLoginSlice.reducer
}

export const store = configureStore({
    reducer,
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
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