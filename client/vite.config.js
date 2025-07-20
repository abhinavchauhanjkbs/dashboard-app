import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    build: {
      chunkSizeWarningLimit: 1000,
    },
    define: {
      // Expose only necessary env variables, not all of process.env
      'import.meta.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  };
});
