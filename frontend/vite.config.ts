import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react({jsxImportSource: '@emotion/react',})],
    define: {
      'process.env': env,
    },
    babel: {
        plugins: ['@emotion/babel-plugin'],
    },

    optimizeDeps: {
    include: [
      '@mui/material',
      '@mui/icons-material',
      '@emotion/react',
      '@emotion/styled'
     ],
    },
  };
});