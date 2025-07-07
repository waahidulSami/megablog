import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      fastRefresh: false, // 🛑 এটি Fast Refresh বন্ধ করে
    }),
  ],
})
