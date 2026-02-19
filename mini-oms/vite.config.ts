import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],

  // @ 경로 별칭 설정
  // import something from '@/lib/apiClient' 처럼 사용 가능
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },

  server: {
    port: 3000,

    // proxy 설정
    // React 앱에서 /api/orders 로 요청하면
    // → 자동으로 http://localhost:3001/orders 로 전달
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})