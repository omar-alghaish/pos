import React, { useState } from "react";
import { Dropdown, Menu } from "antd";
import { useTranslation } from "react-i18next";
import { LOCALES } from "../../../i18n/locales";
import Flag from "react-world-flags";
import Button from "../button/Index";
import { useDispatch } from "react-redux";
import { setGlobalLoading } from "../../../features/globalLoading/globalLoadingSlice";

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const [locale, setLocale] = useState(i18n.language || LOCALES.ENGLISH);
  const dispatch = useDispatch();

  const languages = [
    { key: LOCALES.ENGLISH, label: "English", countryCode: "GB" },
    { key: LOCALES.ARABIC, label: "العربية", countryCode: "SA" },
    { key: LOCALES.ITALIAN, label: "Italiano", countryCode: "IT" },
    { key: LOCALES.FRENCH, label: "Français", countryCode: "FR" },
    { key: LOCALES.SPANISH, label: "Español", countryCode: "ES" },
    { key: LOCALES.GERMAN, label: "Deutsch", countryCode: "DE" },
    { key: LOCALES.RUSSIAN, label: "Русский", countryCode: "RU" },
    { key: LOCALES.MALAY, label: "Bahasa Melayu", countryCode: "MY" },
    { key: LOCALES.PORTUGUESE, label: "Português", countryCode: "PT" },
    { key: LOCALES.TURKISH, label: "Türkçe", countryCode: "TR" },
    { key: LOCALES.CHINESE, label: "中文", countryCode: "CN" },
  ];

  const changeLanguage = (lang: string) => {
    dispatch(setGlobalLoading(true));
    // i18n.changeLanguage(lang);
    setLocale(lang);
    setTimeout(() => {
      dispatch(setGlobalLoading(false));
    }, 1000);
  };
  const getCurrentLanguage = () => {
    return languages.find(language => language.key === locale);
  };

  const currentLanguage = getCurrentLanguage();

  const menu = (
    <Menu
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
        gap: "10px",
        width: "300px",
        maxWidth: "100%",
      }}
    >
      {languages.map(({ key, label, countryCode }) => (
        <Menu.Item
          key={key}
          onClick={() => changeLanguage(key)}
          className={`menu-item ${locale === key ? "active-menu-item" : ""}`}
          style={{ display: "flex", alignItems: "center" }}
        >
          <Flag code={countryCode} style={{ width: "20px", marginRight: "8px" }} />
          {label}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlayStyle={{ border: "none" }} overlay={menu} trigger={["click"]}>
      <Button color="secondary" style={{ width: "max-content", display: "flex", alignItems: "center" }}>
        {currentLanguage && (
          <>
            <Flag code={currentLanguage.countryCode} style={{ width: "20px", marginRight: "8px" }} />
            {currentLanguage.label}
          </>
        )}
      </Button>
    </Dropdown>
  );
};

export default LanguageSelector;
