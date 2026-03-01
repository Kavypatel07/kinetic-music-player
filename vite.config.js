import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // mp3 files are imported as URL references; lrc files use ?raw (text import - NOT listed here)
  assetsInclude: ['**/*.mp3'],
})
