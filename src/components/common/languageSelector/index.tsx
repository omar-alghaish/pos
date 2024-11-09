import React, { useState, useEffect } from "react";
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
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 700); // Track screen size in state
  const dispatch = useDispatch();

  // const languages = [
  //   { key: LOCALES.ENGLISH, label: "English", countryCode: "GB" },
  //   { key: LOCALES.ARABIC, label: "العربية", countryCode: "SA" },
  //   { key: LOCALES.ITALIAN, label: "Italiano", countryCode: "IT" },
  //   { key: LOCALES.FRENCH, label: "Français", countryCode: "FR" },
  //   { key: LOCALES.SPANISH, label: "Español", countryCode: "ES" },
  //   { key: LOCALES.GERMAN, label: "Deutsch", countryCode: "DE" },
  //   { key: LOCALES.RUSSIAN, label: "Русский", countryCode: "RU" },
  //   { key: LOCALES.MALAY, label: "Bahasa Melayu", countryCode: "MY" },
  //   { key: LOCALES.PORTUGUESE, label: "Português", countryCode: "PT" },
  //   { key: LOCALES.TURKISH, label: "Türkçe", countryCode: "TR" },
  //   { key: LOCALES.CHINESE, label: "中文", countryCode: "CN" },
    
  // ];

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
    { key: LOCALES.JAPANESE, label: "日本語", countryCode: "JP" },
    { key: LOCALES.KOREAN, label: "한국어", countryCode: "KR" },
    { key: LOCALES.DUTCH, label: "Nederlands", countryCode: "NL" },
    { key: LOCALES.SWEDISH, label: "Svenska", countryCode: "SE" },
    { key: LOCALES.NORWEGIAN, label: "Norsk", countryCode: "NO" },
    { key: LOCALES.DANISH, label: "Dansk", countryCode: "DK" },
    { key: LOCALES.FINNISH, label: "Suomi", countryCode: "FI" },
    { key: LOCALES.GREEK, label: "Ελληνικά", countryCode: "GR" },
    { key: LOCALES.HEBREW, label: "עברית", countryCode: "IL" },
    { key: LOCALES.POLISH, label: "Polski", countryCode: "PL" },
    { key: LOCALES.HINDI, label: "हिन्दी", countryCode: "IN" },
    { key: LOCALES.BENGALI, label: "বাংলা", countryCode: "BD" },
    { key: LOCALES.VIETNAMESE, label: "Tiếng Việt", countryCode: "VN" },
    { key: LOCALES.THAI, label: "ไทย", countryCode: "TH" },
    { key: LOCALES.HUNGARIAN, label: "Magyar", countryCode: "HU" },
    { key: LOCALES.ROMANIAN, label: "Română", countryCode: "RO" },
    { key: LOCALES.UKRAINIAN, label: "Українська", countryCode: "UA" },
    { key: LOCALES.CZECH, label: "Čeština", countryCode: "CZ" },
    { key: LOCALES.SLOVAK, label: "Slovenčina", countryCode: "SK" },
    { key: LOCALES.CROATIAN, label: "Hrvatski", countryCode: "HR" },
    { key: LOCALES.SERBIAN, label: "Српски", countryCode: "RS" },
    { key: LOCALES.BULGARIAN, label: "Български", countryCode: "BG" },
    { key: LOCALES.SLOVENIAN, label: "Slovenščina", countryCode: "SI" },
    { key: LOCALES.INDONESIAN, label: "Bahasa Indonesia", countryCode: "ID" },
    { key: LOCALES.PERSIAN, label: "فارسی", countryCode: "IR" },
    { key: LOCALES.URDU, label: "اردو", countryCode: "PK" },
    { key: LOCALES.TAMIL, label: "தமிழ்", countryCode: "IN" },
    { key: LOCALES.TELUGU, label: "తెలుగు", countryCode: "IN" },
    { key: LOCALES.MARATHI, label: "मराठी", countryCode: "IN" },
    { key: LOCALES.SWAZI, label: "SiSwati", countryCode: "SZ" },
    { key: LOCALES.SESOTHO, label: "Sesotho", countryCode: "LS" },
    { key: LOCALES.AMHARIC, label: "አማርኛ", countryCode: "ET" },
    { key: LOCALES.ZULU, label: "isiZulu", countryCode: "ZA" },
    { key: LOCALES.XHOSA, label: "isiXhosa", countryCode: "ZA" },
    { key: LOCALES.YORUBA, label: "Yorùbá", countryCode: "NG" },
    { key: LOCALES.HAUSA, label: "Hausa", countryCode: "NG" },
    { key: LOCALES.KHMER, label: "ភាសាខ្មែរ", countryCode: "KH" },
    { key: LOCALES.NEPALI, label: "नेपाली", countryCode: "NP" },
    { key: LOCALES.LAO, label: "ລາວ", countryCode: "LA" },
    { key: LOCALES.MYANMAR, label: "မြန်မာစာ", countryCode: "MM" },
    { key: LOCALES.AFRIKAANS, label: "Afrikaans", countryCode: "ZA" },
    { key: LOCALES.ALBANIAN, label: "Shqip", countryCode: "AL" },
    { key: LOCALES.ARMENIAN, label: "Հայերեն", countryCode: "AM" },
    { key: LOCALES.AZERBAIJANI, label: "Azərbaycan dili", countryCode: "AZ" },
    { key: LOCALES.BASQUE, label: "Euskara", countryCode: "ES" },
    { key: LOCALES.BELARUSIAN, label: "Беларуская", countryCode: "BY" },
    { key: LOCALES.BOSNIAN, label: "Bosanski", countryCode: "BA" },
    { key: LOCALES.CATALAN, label: "Català", countryCode: "ES" },
    { key: LOCALES.ESTONIAN, label: "Eesti", countryCode: "EE" },
    { key: LOCALES.GEORGIAN, label: "ქართული", countryCode: "GE" },
    { key: LOCALES.ICELANDIC, label: "Íslenska", countryCode: "IS" },
    { key: LOCALES.KAZAKH, label: "Қазақ тілі", countryCode: "KZ" },
    { key: LOCALES.KYRGYZ, label: "Кыргызча", countryCode: "KG" },
    { key: LOCALES.LITHUANIAN, label: "Lietuvių", countryCode: "LT" },
    { key: LOCALES.LATVIAN, label: "Latviešu", countryCode: "LV" },
    { key: LOCALES.LUXEMBOURGISH, label: "Lëtzebuergesch", countryCode: "LU" },
    { key: LOCALES.MACEDONIAN, label: "Македонски", countryCode: "MK" },
    { key: LOCALES.MALAGASY, label: "Malagasy", countryCode: "MG" },
    { key: LOCALES.MALTESE, label: "Malti", countryCode: "MT" },
    { key: LOCALES.MONGOLIAN, label: "Монгол хэл", countryCode: "MN" },
    { key: LOCALES.PASHTO, label: "پښتو", countryCode: "AF" },
    { key: LOCALES.SINHALA, label: "සිංහල", countryCode: "LK" },
    { key: LOCALES.SOMALI, label: "Soomaaliga", countryCode: "SO" },
    { key: LOCALES.SWAHILI, label: "Kiswahili", countryCode: "KE" },
    { key: LOCALES.TAGALOG, label: "Tagalog", countryCode: "PH" },
    { key: LOCALES.TAJIK, label: "Тоҷикӣ", countryCode: "TJ" },
    { key: LOCALES.TATAR, label: "Татар", countryCode: "RU" },
    { key: LOCALES.UZBEK, label: "Oʻzbek", countryCode: "UZ" },
    { key: LOCALES.WELSH, label: "Cymraeg", countryCode: "GB" },
    { key: LOCALES.IRISH, label: "Gaeilge", countryCode: "IE" },
    { key: LOCALES.CORSICAN, label: "Corsu", countryCode: "FR" },
    { key: LOCALES.HAITIAN_CREOLE, label: "Kreyòl ayisyen", countryCode: "HT" },
    { key: LOCALES.MAORI, label: "Māori", countryCode: "NZ" },
    { key: LOCALES.BURMESE, label: "မြန်မာစာ", countryCode: "MM" },
    { key: LOCALES.FILIPINO, label: "Filipino", countryCode: "PH" },
    { key: LOCALES.TIBETAN, label: "བོད་ཡིག", countryCode: "CN" },
    { key: LOCALES.BASHKIR, label: "Башҡорт", countryCode: "RU" },
    { key: LOCALES.CHUVASH, label: "Чӑвашла", countryCode: "RU" },
    { key: LOCALES.KINYARWANDA, label: "Ikinyarwanda", countryCode: "RW" },
    { key: LOCALES.LINGALA, label: "Lingála", countryCode: "CD" },
    { key: LOCALES.RWANDA, label: "Kinyarwanda", countryCode: "RW" },
    { key: LOCALES.TSONGA, label: "Xitsonga", countryCode: "ZA" },
    { key: LOCALES.TSWANA, label: "Setswana", countryCode: "BW" },
    { key: LOCALES.VOLAPUK, label: "Volapük", countryCode: "EU" },
    { key: LOCALES.ESPERANTO, label: "Esperanto", countryCode: "EU" },
    { key: LOCALES.INTERLINGUA, label: "Interlingua", countryCode: "EU" }
];


  const changeLanguage = (lang: string) => {
    dispatch(setGlobalLoading(true));
    i18n.changeLanguage(lang);
    setLocale(lang);
    setTimeout(() => {
      dispatch(setGlobalLoading(false));
    }, 1000);
  };

  // Update `isSmallScreen` state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 700);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getCurrentLanguage = () => {
    return languages.find((language) => language.key === locale);
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
          <Flag
            code={countryCode}
            style={{ width: "20px", marginRight: "8px" }}
          />
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
      <Button
        color="secondary"
        style={{
          width: "max-content",
          display: "flex",
          alignItems: "center",
          padding: "10px",
        }}
      >
        {currentLanguage && (
          <>
            <Flag
              code={currentLanguage.countryCode}
              style={{ width: "20px", marginRight: "8px" }}
            />
            {isSmallScreen
              ? currentLanguage.countryCode
              : currentLanguage.label}
          </>
        )}
      </Button>
    </Dropdown>
  );
};

export default LanguageSelector;
