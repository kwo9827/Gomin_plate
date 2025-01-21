import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const socialLogin = createAsyncThunk(
    'auth/socialLogin',
    async ({ provider, code }) => {
        const response = await api.post(`/oauth/${provider}`, { code });
        return response.data;
    }
);

export const updateNickname = createAsyncThunk(
    'auth/updateNickname',
    async (nickname) => {
        const response = await api.put('/user/nickname', { nickname });
        return response.data;
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        accessToken: null,
        isAuthenticated: false,
        user: null,
        status: 'idle',
    },
    reducers: {
        logout: (state) => {
            state.accessToken = null;
            state.isAuthenticated = false;
            state.user = null;
            localStorage.removeItem('accessToken');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(socialLogin.fulfilled, (state, action) => {
                state.accessToken = action.payload.data.accessToken;
                state.isAuthenticated = true;
                localStorage.setItem('accessToken', action.payload.data.accessToken);
            })
            .addCase(updateNickname.fulfilled, (state, action) => {
                if (state.user) {
                    state.user.nickname = action.payload.data.nickname;
                }
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;