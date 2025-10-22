// client/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  root: './client',                 // tell Vite where index.html lives
  plugins: [react()],
  server: { port: 5173, strictPort: true },
  preview: { port: 5173 },
  build: { outDir: '../dist', emptyOutDir: true }
})
