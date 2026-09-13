import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Nested under aadoe.thermalunderground.org/mildev/
export default defineConfig({
  base: '/mildev/',
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: 5178,
  },
})
