import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ⚠️  Đổi '/eden-reports/' thành '/<tên-repo-github-của-bạn>/'
export default defineConfig({
  plugins: [react()],
  base: '/eden-reports/',
})
