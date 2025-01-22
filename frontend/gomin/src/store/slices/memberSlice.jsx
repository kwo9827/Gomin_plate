// 현재 사용자에 대한 상태 관리하는 슬라이스
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    nickname: '', // 유저의 닉네임
    email: '', // 유저의 이메일
    likesReceived: 0, // 유저가 받은 좋아요 수
};

const memberSlice = createSlice({
    name: 'member',
    initialState,
    reducers: {
        // 유저 데이터를 설정 (로그인 시 호출)
        setMemberData: (state, action) => {
            const { nickname, email, likesReceived } = action.payload;
            state.nickname = nickname;
            state.email = email;
            state.likesReceived = likesReceived;
        },
        // 유저의 좋아요 수 업데이트
        updateLikesReceived: (state, action) => {
            state.likesReceived = action.payload; // 새로운 좋아요 수를 설정
        },
        // 유저 데이터를 초기화 (로그아웃 시 호출)
        clearMemberData: (state) => {
            state.nickname = '';
            state.email = '';
            state.likesReceived = 0;
        },
    },
});

export const { setMemberData, updateLikesReceived, clearMemberData } = memberSlice.actions;
export default memberSlice.reducer;
