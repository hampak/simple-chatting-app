import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // server: {
  //   proxy: {
  //     port: "8000",
  //     "/socket.io/": {
  //       target: "http://localhost:8000",
  //       changeOrigin: true,
  //       secure: false,
  //       ws: true
  //     }
  //   }
  // },
  plugins: [react()],
})
