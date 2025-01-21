import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const createAnswer = createAsyncThunk(
    'answer/create',
    async ({ sushiId, content }) => {
        const response = await api.post(`/sushi/rail/${sushiId}`, { content });
        return response.data;
    }
);

export const toggleLike = createAsyncThunk(
    'answer/toggleLike',
    async (answerId) => {
        const response = await api.post(`/answer/${answerId}/like`);
        return { answerId, data: response.data };
    }
);

export const fetchMyAnswers = createAsyncThunk(
    'answer/fetchMyAnswers',
    async () => {
        const response = await api.get('/sushi/answer');
        return response.data;
    }
);

const answerSlice = createSlice({
    name: 'answer',
    initialState: {
        answers: [],
        myAnswers: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createAnswer.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createAnswer.fulfilled, (state, action) => {
                state.status = 'idle';
                state.answers.push(action.payload.data);
            })
            .addCase(toggleLike.fulfilled, (state, action) => {
                const answer = state.answers.find(a => a.answerId === action.payload.answerId);
                if (answer) {
                    answer.isLiked = !answer.isLiked;
                }
            })
            .addCase(fetchMyAnswers.fulfilled, (state, action) => {
                state.myAnswers = action.payload.data.sushi;
            });
    },
});

export default answerSlice.reducer;