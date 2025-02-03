import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import api from '../../api/axios';

const dummyNotifications = [
    {
        notificationId: 1,
        message: "초밥 답변 도착!",
        redirectUrl: "/sushiview",
        createdAt: "2024-01-31T10:00:00",
        sushiId: 123
    },
    {
        notificationId: 2,
        message: "리뷰 연결 답변!",
        redirectUrl: "/sushiview",
        createdAt: "2024-01-31T09:30:00",
        sushiId: 456
    }
];

export const fetchNotifications = createAsyncThunk(
    'notification/fetchAll',
    async () => {
        // API 연결 시 아래 코드 사용
        // const response = await api.get('/notification');
        // return response.data;

        // 더미 데이터 반환
        return {
            success: true,
            data: {
                notification: dummyNotifications
            },
            error: null
        };
    }
);

export const markAsRead = createAsyncThunk(
    'notification/markAsRead',
    async (notificationId) => {
        // API 연결 시 아래 코드 사용
        // const response = await api.put(`/notification/${notificationId}`);
        // return { notificationId, data: response.data };

        return {
            notificationId,
            data: {
                success: true,
                data: null,
                error: null
            }
        };
    }
);

export const fetchUnreadExists = createAsyncThunk(
    'notification/fetchUnreadExists',
    async () => {
        // API 연결 시 아래 코드 사용
        // const response = await api.get('/notification/unread-exists');
        // return response.data;

        return {
            success: true,
            data: {
                hasUnread: true
            },
            error: null
        };
    }
);

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        notifications: [],
        status: 'idle',
        error: null,
        hasUnread: false,
    },
    reducers: {
        clearNotifications: (state) => {
            state.notifications = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotifications.fulfilled, (state, action) => {
                state.notifications = action.payload.data.notification;
            })
            .addCase(markAsRead.fulfilled, (state, action) => {
                state.notifications = state.notifications.filter(
                    n => n.notificationId !== action.payload.notificationId
                );
            })
            .addCase(fetchUnreadExists.fulfilled, (state, action) => {
                state.hasUnread = action.payload.data.hasUnread;
            });
    },
});

export const { clearNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;