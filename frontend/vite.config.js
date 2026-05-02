import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router'],
          ui: ['zustand']
        }
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:1234',
        changeOrigin: true
      }
    }
  }
})
