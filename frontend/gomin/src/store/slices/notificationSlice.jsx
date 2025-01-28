import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

/** 알림 관련 API와 상태를 관리하는 슬라이스 */

/** 알림 목록을 조회하는 API  */
export const fetchNotifications = createAsyncThunk(
    'notification/fetchAll',
    async () => {
        const response = await api.get('/notification');
        return response.data;
    }
);

/** 알림 읽음 처리 */
export const markAsRead = createAsyncThunk(
    'notification/markAsRead',
    async (notificationId) => {
        const response = await api.put(`/notification/${notificationId}`);
        return { notificationId, data: response.data };
    }
);

/** 읽지 않은 알림 존재 여부 조회 */
export const fetchUnreadExists = createAsyncThunk(
    'notification/fetchUnreadExists',
    async () => {
        const response = await api.get('/notification/unread-exists', {
            headers: {
                Authorization: `Bearer {JWT_TOKEN}`,  // Authorization 헤더 추가
            },
        });
        return response.data;
    }
);

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        notifications: [],
        status: 'idle',
        error: null,
        hasUnread: false,  // 읽지 않은 알림 여부를 저장할 상태 추가
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
                const notification = state.notifications.find(
                    n => n.notificationId === action.payload.notificationId
                );
                if (notification) {
                    state.notifications = state.notifications.filter(
                        n => n.notificationId !== action.payload.notificationId
                    );
                }
            })
            .addCase(fetchUnreadExists.fulfilled, (state, action) => {
                state.hasUnread = action.payload.data.hasUnread;  // 읽지 않은 알림 존재 여부 업데이트
            });
    },
});

export const { clearNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
