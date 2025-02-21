import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  server: {
    proxy: {
      '/movies': {
        target: 'http://localhost:8181/api/v1.0.0', // API server
        changeOrigin: true, // Enable proxying for API requests
      },
    },
  },
  plugins: [
    react(),
    tailwindcss()
  ],
});
