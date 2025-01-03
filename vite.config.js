import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    build: {
        target: 'esnext', // Ensure modern browsers compatibility
        outDir: 'dist',
        cssCodeSplit: true, // Enable CSS code splitting
    },
});
