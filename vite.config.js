import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: '/Income/'
  // base: "/Income/",
  // build: {
  //   outDir: "./docs",
  //   emptyOutDir: true, // also necessary
  // },
})
