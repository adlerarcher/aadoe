import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Nested under aadoe.thermalunderground.org/mdev/
export default defineConfig({
  base: '/mdev/',
  plugins: [react()],
})
