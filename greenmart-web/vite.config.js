import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Get the backend API URL from environment variable (VITE_API_URL)
// In development, fallback to localhost
const API_URL = process.env.VITE_API_URL || 'http://localhost:8080'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    // Proxy API requests to backend in development only
    proxy: {
      '/api': {
        target: API_URL,
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    rollupOptions: {
      // Ignore macOS-only module fsevents on Windows
      external: ['fsevents'],
    },
  },
})