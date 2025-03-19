/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // ✅ Activa el modo oscuro basado en clases
  content: ["./src/**/*.{js,ts,jsx,tsx}"], // ✅ Asegura que Tailwind escanee los archivos correctos
  theme: { extend: {} },
  plugins: [],
};

module.exports = {
  theme: {
    extend: {
      keyframes: {
        animatedgradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      backgroundSize: {
        '300%': '300%',
      },
      animation: {
        gradient: 'animatedgradient 6s ease infinite alternate',
      },
    },
  },
}
