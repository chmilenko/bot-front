import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@assets": path.resolve(new URL(".", import.meta.url).pathname, "src/assets"),
      "@components": path.resolve(new URL(".", import.meta.url).pathname, "src/Components"),
      "@hooks": path.resolve(new URL(".", import.meta.url).pathname, "src/Hooks"),
      "@Ui": path.resolve(new URL(".", import.meta.url).pathname, "src/UI"),
      "@Styles": path.resolve(new URL(".", import.meta.url).pathname, "src/Styles"),
      "@Utils": path.resolve(new URL(".", import.meta.url).pathname, "src/Utils"),
    },
  },
});