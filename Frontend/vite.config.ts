import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // ✅ THIS IS THE MISSING PIECE
  plugins: [react()],
  server: {
    host: 'localhost',
    port: 5173,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173,
    },
  },
});
