import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const fetchNotifications = createAsyncThunk(
    'notification/fetchAll',
    async () => {
        const response = await api.get('/notification');
        return response.data;
    }
);

export const markAsRead = createAsyncThunk(
    'notification/markAsRead',
    async (notificationId) => {
        const response = await api.put(`/notification/${notificationId}`);
        return { notificationId, data: response.data };
    }
);

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        notifications: [],
        status: 'idle',
        error: null,
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
            });
    },
});

export const { clearNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;