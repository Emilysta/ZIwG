import { createSlice } from '@reduxjs/toolkit'

// Define a type for the slice state
interface UserLoginState {
    isLoggedIn: boolean
}

// Define the initial state using that type
const initialState: UserLoginState = {
    isLoggedIn: false
}

export const userLoginSlice = createSlice({
    name: 'userLogin',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        login: (state) => {
            state.isLoggedIn = true;
        },
        logout: (state) => {
            document.cookie = ".AspNetCore.Identity.Application=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            state.isLoggedIn = false;
        }
    },
})

export const { login, logout } = userLoginSlice.actions

export default userLoginSlice.reducer