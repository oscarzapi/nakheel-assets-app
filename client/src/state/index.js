import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode :'dark',
    userEmail: '',
    userName:'',
    dateMode:'day',
    filter: 'null',
    salesData: [],
    loading: false
}

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light'
        },
        loginSuccess: (state, action) => {
            state.userEmail = action.payload;
        },
        setUserName: (state, action) => {
            state.userName = action.payload;
        },
        logout: state => {
            state.userName = '';
            state.isLoggedIn = false
        },
        setDateMode: (state, action) => {
            state.dateMode = action.payload
        },
        setFilter: (state, action) => {
            state.filter = action.payload
        },
        getSalesData: (state, action) => {
            state.salesData = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        
    }
})

export const {setMode, loginSuccess, logout, setDateMode, setFilter, getSalesData, setUserName, setLoading } = globalSlice.actions

export default globalSlice.reducer