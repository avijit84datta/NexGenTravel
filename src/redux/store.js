import { configureStore } from '@reduxjs/toolkit';
import destinationReducer from './destinationsSlice.js'

export const store = configureStore({
    reducer: {
        destinations: destinationReducer,
    },
});