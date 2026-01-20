import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // هذه الإضافة تضمن أن روابط الصور والملفات تعمل بشكل صحيح على GitHub Pages
  base: './', 
})
