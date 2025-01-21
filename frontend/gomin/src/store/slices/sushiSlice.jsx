import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const fetchRailSushi = createAsyncThunk(
    'sushi/fetchRail',
    async (size = 15) => {
        const response = await api.get(`/sushi/rail?size=${size}`);
        return response.data;
    }
);

export const fetchMySushi = createAsyncThunk(
    'sushi/fetchMySushi',
    async () => {
        const response = await api.get('/sushi/my');
        return response.data;
    }
);

export const fetchSushiDetail = createAsyncThunk(
    'sushi/fetchDetail',
    async (sushiId) => {
        const response = await api.get(`/sushi/rail/${sushiId}`);
        return response.data;
    }
);

export const createSushi = createAsyncThunk(
    'sushi/create',
    async (sushiData) => {
        const response = await api.post('/sushi', sushiData);
        return response.data;
    }
);

const sushiSlice = createSlice({
    name: 'sushi',
    initialState: {
        railSushi: [],
        mySushi: [],
        currentSushi: null,
        status: 'idle',
        error: null,
    },
    reducers: {
        clearCurrentSushi: (state) => {
            state.currentSushi = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRailSushi.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchRailSushi.fulfilled, (state, action) => {
                state.status = 'idle';
                state.railSushi = action.payload.data.sushi;
            })
            .addCase(fetchRailSushi.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchMySushi.fulfilled, (state, action) => {
                state.mySushi = action.payload.data.sushi;
            })
            .addCase(fetchSushiDetail.fulfilled, (state, action) => {
                state.currentSushi = action.payload.data;
            });
    },
});

export const { clearCurrentSushi } = sushiSlice.actions;
export default sushiSlice.reducer;