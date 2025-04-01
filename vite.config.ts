import { defineConfig } from "vite";
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    port: 3000,
    allowedHosts: [
      'apoyovivo.ddns.net', // Agrega tu dominio aquí
    ],
  },
});
