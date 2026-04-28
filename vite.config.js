// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
   optimizeDeps: {
    include: ['react-icons/si', 'react-icons/fa'] // Added 'react-icons/fa' to pre-bundle FaJava
  } // This tells Vite to pre-bundle these icons
  
})