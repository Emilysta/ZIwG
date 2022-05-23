import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EditableUserData, UserData } from './UserApiSlice';

// Define a type for the slice state
interface UserLoginState {
    isLoggedIn: boolean,
    userId: string,
    userData: UserData,
}

function checkInitialState(): UserLoginState {
    let state: UserLoginState = {
        isLoggedIn: false,
        userId: null,
        userData: null,
    }
    try {
        const serializedState = localStorage.getItem('userData');

        if (serializedState === null) {
            return state;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return state;
    }
}

// Define the initial state using that type
const initialState: UserLoginState = checkInitialState();

export const userLoginSlice = createSlice({
    name: 'userLogin',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ userId: string, userData: UserData }>) => {
            state.isLoggedIn = true;
            state.userId = action.payload.userId;
            state.userData = action.payload.userData;

            localStorage.setItem("userData", JSON.stringify(state));
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.userId = null;
            state.userData = null;

            localStorage.removeItem("userData");
        },
        updateUserData: (state, action: PayloadAction<EditableUserData>) => {
            state.userData = { ...state.userData, ...action.payload };
            localStorage.setItem("userData", JSON.stringify(state));
        },
    },
})

export const { login, logout, updateUserData } = userLoginSlice.actions

export default userLoginSlice.reducer