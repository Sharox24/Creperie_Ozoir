import path from 'node:path';
import { defineConfig } from 'vite';
import baseConfig from './vite.config.js';

export default defineConfig({
  ...baseConfig,
  root: path.resolve(__dirname, 'admin'),
  resolve: {
    ...(baseConfig.resolve ?? {}),
    alias: {
      ...(baseConfig.resolve?.alias ?? {}),
      '@': path.resolve(__dirname, './admin/src'),
      '#shared': path.resolve(__dirname, './shared'),
    },
    extensions: baseConfig.resolve?.extensions ?? ['.jsx', '.js', '.tsx', '.ts', '.json'],
  },
  build: {
    ...(baseConfig.build ?? {}),
    outDir: 'dist/admin',
    rollupOptions: {
      ...(baseConfig.build?.rollupOptions ?? {}),
    },
  },
  server: {
    ...(baseConfig.server ?? {}),
    port: 5174,
    open: '/',
  },
  preview: {
    port: 5174,
  },
});
