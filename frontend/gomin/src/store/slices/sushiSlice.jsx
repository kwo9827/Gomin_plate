import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

// 무작위 초밥을 받아오는 요청
// 초밥 id, 데코 요소만 담겨옴
export const fetchRailSushi = createAsyncThunk(
    'sushi/fetchRail',
    async (size = 15) => {
        const response = await api.get(`/sushi/rail?size=${size}`);
        return response.data;
    }
);

// 내가 올린 초밥 리스트 요청
// 초밥 배열 내용 다담겨서
export const fetchMySushi = createAsyncThunk(
    'sushi/fetchMySushi',
    async () => {
        const response = await api.get('/sushi/my');
        return response.data;
    }
);

// 레일 위에 있는 스시 중에 
// 하나 고르는 api
export const fetchSushiDetail = createAsyncThunk(
    'sushi/fetchDetail',
    async (sushiId) => {
        const response = await api.get(`/sushi/rail/${sushiId}`);
        return response.data;
    }
);

// 초밥 등록하기
export const createSushi = createAsyncThunk(
    'sushi/create',
    async (sushiData) => {
        const response = await api.post('/sushi', sushiData);
        return response.data;
    }
);

// 내 초밥 상세 정보 요청
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