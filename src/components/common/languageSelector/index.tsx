import React, { useState } from "react";
import { Dropdown, Menu } from "antd";
import { useTranslation } from "react-i18next";
import { LOCALES } from "../../../i18n/locales";
import { FaGlobe } from "react-icons/fa"; // Import relevant icons
import Button from "../button/Index";
import { useDispatch } from "react-redux";
import { setGlobalLoading } from "../../../features/globalLoading/globalLoadingSlice";

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const [locale, setLocale] = useState(i18n.language);
  const dispatch = useDispatch();
  const languages = [
    { key: LOCALES.ENGLISH, label: "English" },
    { key: LOCALES.ARABIC, label: "العربية" },
    { key: LOCALES.ITALIAN, label: "Italiano" },
    { key: LOCALES.FRENCH, label: "Français" },
    { key: LOCALES.SPANISH, label: "Español" },
    { key: LOCALES.GERMAN, label: "Deutsch" },
    { key: LOCALES.RUSSIAN, label: "Русский" },
    { key: LOCALES.MALAY, label: "Bahasa Melayu" },
    { key: LOCALES.PORTUGUESE, label: "Português" },
    { key: LOCALES.TURKISH, label: "Türkçe" },
    { key: LOCALES.CHINESE, label: "中文" },
  ];

  const changeLanguage = (lang: string) => {
    dispatch(setGlobalLoading(true));
    i18n.changeLanguage(lang);
    setLocale(lang);
    setTimeout(() => {
          dispatch(setGlobalLoading(false));

    }, 1000);
  };

  const menu = (
    <Menu
      style={{
        display: "flex",
        flexWrap: "wrap",
        width: "300px",
        maxWidth: "100%",
      }}
    >
      {languages.map(({ key, label }) => (
        <Menu.Item
          key={key}
          onClick={() => changeLanguage(key)}
          className={`menu-item ${locale === key ? "active-menu-item" : ""}`} // Apply classes conditionally
        >
          {label}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown
      overlayStyle={{ border: "none" }}
      overlay={menu}
      trigger={["click"]}
    >
      <Button color="secondary" style={{ width: "max-content" }}>
        <FaGlobe /> {locale}
      </Button>
    </Dropdown>
  );
};

export default LanguageSelector;
