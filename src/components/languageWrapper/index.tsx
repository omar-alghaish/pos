import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import { LOCALES } from "../../i18n";

const LanguageWrapper = () => {
  const { lang } = useParams();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (lang && Object.keys(LOCALES).includes(lang)) {
      i18n.changeLanguage(lang); // Change language based on URL
    } else {
      i18n.changeLanguage(LOCALES.ENGLISH); // Fallback to English
    }
  }, [lang, i18n]);

  return <Outlet />;
};

export default LanguageWrapper;
