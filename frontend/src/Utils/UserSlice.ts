import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface UserLoginState {
    isLoggedIn: boolean,
    userId: string,
}

// Define the initial state using that type
const initialState: UserLoginState = {
    isLoggedIn: false,
    userId: undefined,
}

export const userLoginSlice = createSlice({
    name: 'userLogin',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        login: (state, action: PayloadAction<string>) => {
            state.isLoggedIn = true;
            state.userId = action.payload;
            console.log("logged in user: " + state.userId);
        },
        logout: (state) => {
            document.cookie = ".AspNetCore.Identity.Application=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            state.isLoggedIn = false;
            state.userId = undefined;
            console.log("logged out user");
        }
    },
})

export const { login, logout } = userLoginSlice.actions

export default userLoginSlice.reducer