import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";
import { clearMemberData, setAuthData } from "./memberSlice";

/* 카카오 로그인 요청 처리 */
export const kakaoLogin = createAsyncThunk(
  "auth/kakaoLogin",
  async ({ clientId, redirectUri }, { rejectWithValue }) => {
    try {
      // 카카오 로그인 URL 생성
      const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
      window.location.href = kakaoAuthUrl; // 카카오 로그인 페이지로 리다이렉트
    } catch (error) {
      return rejectWithValue(error.response?.data || "카카오 로그인 요청 실패");
    }
  }
);

/* 소셜 로그인 요청 처리 */
export const socialLogin = createAsyncThunk(
  "auth/socialLogin",
  async ({ provider, code }, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post(`/oauth/${provider}`, { code });
      // 멤버 데이터 저장
      dispatch(setAuthData(response.data.data));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "소셜 로그인 요청 실패");
    }
  }
);

/* 로그아웃 요청 처리 */
export const logoutApi = createAsyncThunk(
  "auth/logoutApi",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post("/api/auth/logout");
      // 멤버 데이터 초기화
      dispatch(clearMemberData());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "로그아웃 요청 실패");
    }
  }
);

// 닉네임 수정 API
export const updateNickname = createAsyncThunk(
  "auth/updateNickname",
  async (nickname) => {
    const response = await api.put("/user/nickname", { nickname });
    return response.data;
  }
);

// 회원탈퇴 API
export const deleteAccount = createAsyncThunk(
  "auth/deleteAccount",
  async (_, { dispatch }) => {
    await api.delete("/user/me");
    // 멤버 데이터 초기화
    dispatch(clearMemberData());
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: null,
    isAuthenticated: false,
    user: null,
    status: "idle",
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.accessToken = null;
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("accessToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(kakaoLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(kakaoLogin.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(kakaoLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(socialLogin.fulfilled, (state, action) => {
        state.accessToken = action.payload.data.accessToken;
        state.isAuthenticated = true;
        state.user = action.payload.data.user;
        localStorage.setItem("accessToken", action.payload.data.accessToken);
      })
      .addCase(logoutApi.fulfilled, (state) => {
        state.accessToken = null;
        state.isAuthenticated = false;
        state.user = null;
        localStorage.removeItem("accessToken");
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
        localStorage.removeItem("accessToken");
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
