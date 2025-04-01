import { defineConfig } from "vite";
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    port: process.env.SERVER_FRONTEND_PORT as unknown as number,
    allowedHosts: [
      'apoyovivo.ddns.net', // Agrega tu dominio aquí
    ],
  },
});
