import { defineConfig } from "vite";
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [tailwindcss()],
    server: {
      port: 80,
      allowedHosts: [ 'apoyovivo.ddns.net' ],
    },

});