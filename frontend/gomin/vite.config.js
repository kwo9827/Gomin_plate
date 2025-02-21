import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config(); // 시스템 환경변수 로드

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.KAKAO_CLIENT_ID": JSON.stringify(process.env.KAKAO_CLIENT_ID),
  },
});
