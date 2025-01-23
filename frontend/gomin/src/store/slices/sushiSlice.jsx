import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

/* 초밥(질문)에 대한 API와 상태관리를 하는 슬라이스 */
export const fetchRailSushi = createAsyncThunk(
    'sushi/fetchRail',
    async (size = 15) => {
        const response = await api.get(`/sushi/rail?size=${size}`);
        return response.data;
    }
);

/* 본인이 등록한 초밥(질문)에 대한 리스트를 불러오는 API */
export const fetchMySushi = createAsyncThunk(
    'sushi/fetchMySushi',
    async () => {
        const response = await api.get('/sushi/my');
        return response.data;
    }
);

/* 레일에 있는 초밥 중 특정 초밥에 대한 데이터를 불러오는 API */
export const fetchSushiDetail = createAsyncThunk(
    'sushi/fetchDetail',
    async (sushiId) => {
        const response = await api.get(`/sushi/rail/${sushiId}`);
        return response.data;
    }
);

/* 초밥(질문)을 등록하는 API */
export const createSushi = createAsyncThunk(
    'sushi/create',
    async (sushiData) => {
        const response = await api.post('/sushi', sushiData);
        return response.data;
    }
);

/* 나의 초밥(질문)에 대한 상세 데이터 요청 API */
export const fetchMySushiDetail = createAsyncThunk(
    'sushi/fetchMySushiDetail',
    async (sushiId) => {
        const response = await api.get(`/sushi/my/${sushiId}`);
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
            })
            .addCase(fetchMySushiDetail.fulfilled, (state, action) => {
                state.currentSushi = action.payload.data;
            });
    },
});

export const { clearCurrentSushi } = sushiSlice.actions;
export default sushiSlice.reducer;