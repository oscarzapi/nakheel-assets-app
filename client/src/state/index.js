import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode :'dark',
    userData: {},
    dateMode:'daily',
    data: []
}

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light'
        },
        loginSuccess: (state, action) => {
            state.userData = action.payload;
        },
        logout: state => {
            state.userName = '';
            state.isLoggedIn = false
        },
        setDateMode: (state, action) => {
            state.dateMode = action.payload
        },
        getData: (state, action) => {
            state.data = action.payload
        },
    }
})

export const {setMode, loginSuccess, logout, setDateMode,getData } = globalSlice.actions

export default globalSlice.reducer