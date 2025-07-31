import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://bananacounter-production.up.railway.app',
        changeOrigin: true,
        secure: false,
      }
    }
  },
})
