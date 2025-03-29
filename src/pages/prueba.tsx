//Este es un archivo con el que prebé que si servía lo de los idiomas.
import { useTranslation } from "react-i18next";

const TestComponent = () => {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <h1>{t("welcome")}</h1>
      <button onClick={() => i18n.changeLanguage("es")}>ES</button>
      <button onClick={() => i18n.changeLanguage("en")}>EN</button>
      <button onClick={() => i18n.changeLanguage("zh")}>ZH</button>
    </div>
  );
};

export default TestComponent;
