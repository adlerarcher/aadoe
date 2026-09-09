import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Custom domain aadoe.thermalunderground.org serves from root.
export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    port: 5176,
  },
})
