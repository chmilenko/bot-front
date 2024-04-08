import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "src/assets"),
      "@Components": path.resolve(__dirname, "src/Components"),
      "@hooks": path.resolve(__dirname, "src/Hooks"),
      "@Ui": path.resolve(__dirname, "src/UI"),
      "@Utils": path.resolve(__dirname, "src/Utils"),
      "@Features": path.resolve(__dirname, "src/Features"),

    },
  },
})
