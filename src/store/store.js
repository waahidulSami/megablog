import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice'; // Import the authSlice reducer


const store = configureStore({
    reducer: {
        auth: authSlice, // Assuming authSlice is imported from authSlice.js
    },
});

export default store;