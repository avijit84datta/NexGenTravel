import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../services/api.jsx';

// Async Thunk: Fetch all destinations
export const fetchDestinations = createAsyncThunk(
    'destinations/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get('/destination');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Async Thunk: Create a destination
export const createDestination = createAsyncThunk(
    'destinations/create',
    async (destination, { rejectWithValue }) => {
        try {
            const response = await apiClient.post('/destination', destination);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Async Thunk: Update a destination
export const updateDestination = createAsyncThunk(
    'destinations/update',
    async (destination, { rejectWithValue }) => {
        try {
            const response = await apiClient.put(`/destination/${destination.id}`, destination);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Slice
const destinationsSlice = createSlice({
    name: 'destinations',
    initialState: {
        list: [],
        status: 'idle',
        error: null,
        selectedDestination: null, // For editing
    },
    reducers: {
        selectDestination: (state, action) => {
            state.selectedDestination = action.payload;
        },
        clearSelection: (state) => {
            state.selectedDestination = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDestinations.fulfilled, (state, action) => {
                state.list = action.payload;
            })
            .addCase(createDestination.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })
            .addCase(updateDestination.fulfilled, (state, action) => {
                const index = state.list.findIndex((dest) => dest.id === action.payload.id);
                if (index !== -1) {
                    state.list[index] = action.payload;
                }
            });
    },
});

export const { selectDestination, clearSelection } = destinationsSlice.actions;
export default destinationsSlice.reducer;
