// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
   optimizeDeps: {
    include: ['react-icons/si', 'react-icons/fa'] // Added 'react-icons/fa' to pre-bundle FaJava
  }, // This tells Vite to pre-bundle these icons
  build: {
    chunkSizeWarningLimit: 1300, // 'three' chunk (~1.2MB) is async-loaded only when the 3D scene mounts
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (id.includes('three') || id.includes('@react-three') || id.includes('maath') || id.includes('zustand') || id.includes('react-reconciler') || id.includes('react-use-measure') || id.includes('its-fine') || id.includes('suspend-react')) return 'three';
          if (id.includes('framer-motion') || id.includes('motion-dom') || id.includes('motion-utils')) return 'motion';
          if (id.includes('gsap')) return 'gsap';
          if (id.includes('react-icons') || id.includes('lucide-react')) return 'icons';
        }
      }
    }
  }
})