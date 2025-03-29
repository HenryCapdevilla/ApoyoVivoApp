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
        fire: {
          '0%': { opacity: '1', transform: 'scale(1) rotate(45deg)' },
          '100%': { opacity: '0.8', transform: 'scale(0.9) rotate(45deg)' }
        },
        light: {
          '0%': { opacity: '1', transform: 'translateY(0px) scale(1)' },
          '100%': { opacity: '0.6', transform: 'translateY(-10px) scaleX(0.9)' }
        }
      },
      backgroundSize: {
        '300%': '300%',
      },
      animation: {
        gradient: 'animatedgradient 6s ease infinite alternate',
        fire: 'fire 2s linear infinite alternate',
        light: 'light 2s linear infinite alternate'
      },
    },
  },
}