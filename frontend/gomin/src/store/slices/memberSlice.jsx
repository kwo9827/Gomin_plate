import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nickname: "방구맨",
  email: "",
  likesReceived: 0,
  accessToken: "",
  refreshToken: "",
  isNew: false,
};

const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    setMemberData: (state, action) => {
      const { nickname, email, likesReceived } = action.payload;
      state.nickname = nickname;
      state.email = email;
      state.likesReceived = likesReceived;
    },
    setAuthData: (state, action) => {
      const { accessToken, refreshToken, user } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.nickname = user.nickname;
      state.isNew = user.isNew;
    },
    updateNicknameState: (state, action) => {
      state.nickname = action.payload; // 닉네임 업데이트
    },
    updateLikesReceived: (state, action) => {
      state.likesReceived = action.payload;
    },
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
  updateNicknameState,
  updateLikesReceived,
  clearMemberData,
} = memberSlice.actions;
export default memberSlice.reducer;
