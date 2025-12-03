import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/wp-json": {
        target: "https://akustorebd.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
