import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

/* 인증 관련 API와 상태 관리를 하는 슬라이스 */


export const socialLogin = createAsyncThunk(
    'auth/socialLogin',
    async ({ provider, code }) => {
        const response = await api.post(`/oauth/${provider}`, { code });
        return response.data;
    }
);

// 닉네임 수정하는 API
export const updateNickname = createAsyncThunk(
    'auth/updateNickname',
    async (nickname) => {
        const response = await api.put('/user/nickname', { nickname });
        return response.data;
    }
);

// 회원탈퇴 API
export const deleteAccount = createAsyncThunk(
    'auth/deleteAccount',
    async () => {
        await api.delete('/user/me');
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
            })
            .addCase(deleteAccount.fulfilled, (state) => {
                state.accessToken = null;
                state.isAuthenticated = false;
                state.user = null;
                localStorage.removeItem('accessToken');
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
