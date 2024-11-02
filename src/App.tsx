import { useEffect, useState } from "react";
import "./App.css";
import "./sass/style.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes from "./routes/router";
import MainLayout from "./components/layout/MainLayout";
import { useTranslation } from "react-i18next";
import { IntlProvider } from "react-intl";
import { LOCALES } from "./i18n"
import messages from "./i18n/messages";
import LoadingPage from "./components/loadingPage/Index";
import { ConfigProvider } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";

function App() {
  const { i18n: i18nInstance } = useTranslation();
  const [isLoading, setIsLoading] = useState(true); 
  const { apperance } = useSelector((state: RootState) => state.settings);
  
  useEffect(() => {
    const currentLang = i18nInstance.language;
    document.dir = currentLang === "ar" ? "rtl" : "ltr"; 

    setTimeout(() => {
      setIsLoading(false);
    }, 2000); 
  }, [i18nInstance.language]);

  useEffect(() => {
    document.body.className = apperance.theme
    const handleUpdateColors = () => {
      document.documentElement.style.setProperty(
        "--light-primary-color",
        apperance.lightBrandColor
      );

      document.documentElement.style.setProperty(
        "--dark-primary-color",
        apperance.darkBrandColor
      );
    };
    handleUpdateColors();
  }, [apperance]); // Update colors when apperance changes

  const currentLocale =
    i18nInstance.language 
  const isRTL = i18nInstance.language === LOCALES.ARABIC;
  console.log('Messages for Current Locale:', messages[currentLocale]);

  // Helper function to recursively render routes with children
  const renderRoutes = (routes: any[]) => {
    return routes.map((route, index) => {
      if (route.children) {
        // If the route has children, use nested routes
        return (
          <Route path={route.path} key={index} element={route.element}>
            {renderRoutes(route.children)}{" "}
            {/* Recursively render child routes */}
          </Route>
        );
      }
      return route.index ? (
        <Route index key={index} element={route.element} />
      ) : (
        <Route path={route.path} key={index} element={route.element} />
      );
    });
  };

  if (isLoading) {
    return <LoadingPage variant="linear" />; // Show LoadingPage while loading
  }

  return (
    <IntlProvider locale={currentLocale} messages={messages[currentLocale]}>
      <ConfigProvider
        direction={`${isRTL ? "rtl" : "ltr"}`}
        theme={{
          token: {
            colorPrimary:
              apperance.theme === "dark"
                ? apperance.darkBrandColor
                : apperance.lightBrandColor,
            // You can also set other theme tokens here based on your application's needs
            colorBgBase: apperance.theme === "dark" ? "#1c1c1c" : "#ffffff", // Example background color
            colorTextBase: apperance.theme === "dark" ? "#ffffff" : "#000000", // Example text color
            colorBgElevated: apperance.theme === 'dark' ? '#2a2a2a' : '#e6f7ff', // Using colorBgElevated

          },
        }}
      >
        <div className={`App ${isRTL ? "rtl" : ""}`}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                {renderRoutes(routes)}{" "}
                {/* Render the routes, including nested ones */}
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      </ConfigProvider>
    </IntlProvider>
  );
}

export default App;
