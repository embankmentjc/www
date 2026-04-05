import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

const allowedHosts = process.env.VITE_ALLOWED_HOSTS?.split(',') ?? []

export default defineConfig({
  plugins: [react()],
  server: {
    port: 8559,
    host: true,
    allowedHosts,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
