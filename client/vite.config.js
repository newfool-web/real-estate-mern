import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: process.env.NODE_ENV === 'production'
          ? '' 
          : 'http://localhost:3000/',
        secure: false,
      },
    },
  },
  plugins: [react(), tailwindcss()],  
})

