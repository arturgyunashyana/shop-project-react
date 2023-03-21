import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn: false,
    email: null,
    userName: null,
    userId: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        SET__ACTIVE__USER: (state, action) => {
            console.log(action.payload);
            const { email, userName, userId } = action.payload
            state.isLoggedIn = true
            state.email = email
            state.userName = userName
            state.userId = userId
        },
        REMOVE__ACTIVE__USER: (state, action) => {
            state.isLoggedIn = false
            state.email = null
            state.userName = null
            state.userId = null
        }

    }
});

export const { SET__ACTIVE__USER, REMOVE__ACTIVE__USER } = authSlice.actions

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn
export const selectEmail = (state) => state.auth.email
export const selectUserName = (state) => state.auth.useName
export const selectUserId = (state) => state.auth.userId


export default authSlice.reducer