import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: 'advancedCounter'  // Replace 'your-repo-name' with the actual repo name
})
