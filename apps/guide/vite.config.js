import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Nested under aadoe.thermalunderground.org/guide/
export default defineConfig({
  base: '/guide/',
  plugins: [react()],
})
