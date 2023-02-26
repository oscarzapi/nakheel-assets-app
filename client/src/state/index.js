import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode :'dark',
    userName: '',
    isLoggedIn: false
}

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light'
        },
        loginSuccess: (state, action) => {
            state.userName = action.payload;
            state.isLoggedIn=true
        },
        logout: state => {
            state.userName = '';
            state.isLoggedIn = false
        }
    }
})

export const {setMode, loginSuccess, logout } = globalSlice.actions

export default globalSlice.reducer