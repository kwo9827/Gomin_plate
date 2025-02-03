import { createSlice } from "@reduxjs/toolkit";

/* 현재 사용자에 대한 정보를 관리하는 슬라이스 */

const initialState = {
  nickname: "방구맨", // 유저의 닉네임
  email: "", // 유저의 이메일
  likesReceived: 0, // 유저가 받은 좋아요 수
  accessToken: "", // 인증된 유저의 액세스 토큰
  refreshToken: "", // 인증된 유저의 리프레시 토큰
  isNew: false, // 신규 회원 여부
};

const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    // 유저 데이터를 설정 (로그인 시 호출)
    setMemberData: (state, action) => {
      const { nickname, email, likesReceived } = action.payload;
      state.nickname = nickname;
      state.email = email;
      state.likesReceived = likesReceived;
    },
    // 인증 데이터를 설정 (소셜 로그인 시 호출)
    setAuthData: (state, action) => {
      const { accessToken, refreshToken, user } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.nickname = user.nickname; // 소셜 인증 데이터에서 닉네임 설정
      state.isNew = user.isNew; // 신규 회원 여부 설정
    },
    // 유저의 좋아요 수 업데이트
    updateLikesReceived: (state, action) => {
      state.likesReceived = action.payload; // 새로운 좋아요 수를 설정
    },
    // 유저 데이터를 초기화 (로그아웃 시 호출)
    clearMemberData: (state) => {
      state.nickname = "";
      state.email = "";
      state.likesReceived = 0;
      state.accessToken = "";
      state.refreshToken = "";
      state.isNew = false;
    },
  },
});

export const {
  setMemberData,
  setAuthData,
  updateLikesReceived,
  clearMemberData,
} = memberSlice.actions;
export default memberSlice.reducer;
