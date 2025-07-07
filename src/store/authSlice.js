import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false, 
    userData:null
}


const authSlice = createSlice({
    name: "auth" ,
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData; // Store user data
        },
        logout: (state) => {
            state.status = false;
            state.userData = null; // Clear user data on logout
        },

    }
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;