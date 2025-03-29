import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

// Importar los archivos de traducción directamente
import translationEN from "./locales/en/translation.json";
import translationES from "./locales/es/translation.json";
import translationZH from "./locales/zh/translation.json";

// Recursos de traducción
const resources = {
  en: {
    translation: translationEN
  },
  es: {
    translation: translationES
  },
  zh: {
    translation: translationZH
  }
};

i18n
  .use(LanguageDetector) // Detecta el idioma del navegador
  .use(initReactI18next) // Conecta con React
  .init({
    resources, // Usar los recursos importados
    fallbackLng: "en", // Usa inglés si el idioma detectado no está disponible
    debug: true, // Muestra logs en la consola (puedes ponerlo en false)
    interpolation: {
      escapeValue: false, // Permite insertar HTML en los textos
    }
  });

export default i18n;