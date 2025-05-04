

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: `http://localhost:${process.env.PORT}`, // Use the port your backend is running on
        changeOrigin: true,
        // Optional: If your backend API doesn't have the '/api' prefix, uncomment and adjust
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});