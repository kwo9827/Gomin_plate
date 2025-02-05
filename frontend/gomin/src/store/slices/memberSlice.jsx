import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

/* 현재 사용자에 대한 정보를 관리하는 슬라이스 */

const initialState = {
  nickname: "방구맨", // 유저의 닉네임
  email: "", // 유저의 이메일
  likesReceived: 0, // 유저가 받은 좋아요 수
  accessToken: "", // 인증된 유저의 액세스 토큰
  refreshToken: "", // 인증된 유저의 리프레시 토큰
  isNew: false, // 신규 회원 여부
};

// 좋아요 받은 개수 가져오는 API 요청
export const countLike = createAsyncThunk("member/countLike", async () => {
  try {
    const response = await api.get("/user/my-like");
    console.log("API 응답 데이터", response.data);
    return response.data.data;
  } catch (error) {
    console.log("API 요청 실패", error);
  }
  return response.data;
});

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
  extraReducers: (builder) => {
    builder
      // 백엔드에서 좋아요 개수를 가져와 상태에 업데이트
      .addCase(countLike.fulfilled, (state, action) => {
        console.log("CountLike fulfilled", action.payload); // 콘솔 확인
        state.likesReceived = action.payload.totalLikes;
      })
      .addCase(countLike.rejected, (state, action) => {
        console.log("countLike API 요청 error", action.error);
      });
  },
});

export const {
  setMemberData,
  setAuthData,
  updateLikesReceived,
  clearMemberData,
} = memberSlice.actions;

export default memberSlice.reducer;
