// import { useEffect, useState } from "react";
// import "./App.css";
// import "./sass/style.css";
// import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
// import routes from "./routes/router";
// import MainLayout from "./components/layout/MainLayout";
// import { useTranslation } from "react-i18next";
// import { IntlProvider } from "react-intl";
// import { LOCALES } from "./i18n";
// import messages from "./i18n/messages";
// import LoadingPage from "./components/loadingPage/Index";
// import { ConfigProvider } from "antd";
// import { useSelector } from "react-redux";
// import { RootState } from "./app/store";
// import './i18n/i18n'; // Ensure this is at the top

// function App() {
//   const { i18n: i18nInstance } = useTranslation();
//   const [isLoading, setIsLoading] = useState(true);
//   const { apperance } = useSelector((state: RootState) => state.settings);
// const navigate = useNavigate()

//   useEffect(() => {
//     const currentLang = i18nInstance.language;
//     document.dir = currentLang === "ar" ? "rtl" : "ltr";

//     setTimeout(() => {
//       setIsLoading(false);
//     }, 2000);

//   }, [i18nInstance.language]);

//   useEffect(() => {
//     document.body.className = apperance.theme;
//     const handleUpdateColors = () => {
//       document.documentElement.style.setProperty(
//         "--light-primary-color",
//         apperance.lightBrandColor
//       );

//       document.documentElement.style.setProperty(
//         "--dark-primary-color",
//         apperance.darkBrandColor
//       );
//     };
//     handleUpdateColors();
//   }, [apperance]); // Update colors when apperance changes

//   const currentLocale = i18nInstance.language;
//   const isRTL = i18nInstance.language === LOCALES.ARABIC;
//   console.log("Messages for Current Locale:", messages[currentLocale]);

//   useEffect(() => {
//     // Redirect if URL doesn't match the selected language
//     const currentLang = i18nInstance.language;
//     const currentPath = window.location.pathname;
//     const langCode = currentPath.split("/")[1];

//     if (langCode !== currentLang) {
//       navigate(`/${currentLang}${currentPath.slice(3)}`);
//     }
//   }, [i18nInstance.language, navigate]);

//   // Helper function to recursively render routes with children
//   const renderRoutes = (routes: any[]) => {
//     return routes.map((route, index) => {
//       if (route.children) {
//         // If the route has children, use nested routes
//         return (
//           <Route path={route.path} key={index} element={route.element}>
//             {renderRoutes(route.children)}{" "}
//             {/* Recursively render child routes */}
//           </Route>
//         );
//       }
//       return route.index ? (
//         <Route index key={index} element={route.element} />
//       ) : (
//         <Route path={route.path} key={index} element={route.element} />
//       );
//     });
//   };

//   if (isLoading) {
//     return <LoadingPage variant="linear" isopen={isLoading} />;
//   }

//   return (
//     <IntlProvider locale={currentLocale} messages={messages[currentLocale]}>
//       <ConfigProvider
//         direction={`${isRTL ? "rtl" : "ltr"}`}
//         theme={{
//           token: {
//             colorPrimary:
//               apperance.theme === "dark"
//                 ? apperance.darkBrandColor
//                 : apperance.lightBrandColor,
//             // You can also set other theme tokens here based on your application's needs
//             colorBgBase: apperance.theme === "dark" ? "#1c1c1c" : "#ffffff", // Example background color
//             colorTextBase: apperance.theme === "dark" ? "#ffffff" : "#000000", // Example text color
//             colorBgElevated: apperance.theme === "dark" ? "#2a2a2a" : "#e6f7ff", // Using colorBgElevated
//           },
//         }}
//       >
//         <div className={`App ${isRTL ? "rtl" : ""}`}>
//           {/* <BrowserRouter> */}
//             <Routes>
//               <Route path="/" element={<MainLayout />}>
//                 {renderRoutes(routes)}
//                 {/* Render the routes, including nested ones */}
//               </Route>
//             </Routes>
//           {/* </BrowserRouter> */}
//         </div>
//       </ConfigProvider>
//     </IntlProvider>
//   );
// }

// export default App;

import { useEffect, useState } from "react";
import "./App.css";
import "./sass/style.css";
import {
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import routes from "./routes/router";
import MainLayout from "./components/layout/MainLayout";
import { useTranslation } from "react-i18next";
import { IntlProvider } from "react-intl";
import { LOCALES } from "./i18n";
import messages from "./i18n/messages";
import LoadingPage from "./components/loadingPage/Index";
import { ConfigProvider } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import "./i18n/i18n"; // Ensure this is at the top

function App() {
  const { i18n: i18nInstance } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const { apperance } = useSelector((state: RootState) => state.settings);
  const navigate = useNavigate();

  useEffect(() => {
    const currentLang = i18nInstance.language;
    document.dir = currentLang === "ar" ? "rtl" : "ltr";

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [i18nInstance.language]);

  useEffect(() => {
    document.body.className = apperance.theme;
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

  const currentLocale = i18nInstance.language;
  const isRTL = i18nInstance.language === LOCALES.ARABIC;

  // Handle redirection to /en/home or /ar/home if only /en or /ar is visited
  useEffect(() => {
    const currentLang = i18nInstance.language;
    const currentPath = window.location.pathname;
    const langCode = currentPath.split("/")[1];

    if (langCode && langCode !== currentLang) {
      navigate(`/${currentLang}${currentPath.slice(3)}`); // Redirect to correct language path
    } else if (currentPath === `/${currentLang}`) {
      navigate(`/${currentLang}/home`); // Redirect to home page if only /en or /ar is visited
    }
  }, [i18nInstance.language, navigate]);

  // Helper function to recursively render routes with children
  const renderRoutes = (routes: any[]) => {
    return routes.map((route, index) => {
      if (route.children) {
        return (
          <Route path={route.path} key={index} element={route.element}>
            {renderRoutes(route.children)}
          </Route>
        );
      }
      return <Route path={route.path} key={index} element={route.element} />;
    });
  };

  if (isLoading) {
    return <LoadingPage variant="linear" isopen={isLoading} />;
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
            colorBgBase: apperance.theme === "dark" ? "#1c1c1c" : "#ffffff", // Background color
            colorTextBase: apperance.theme === "dark" ? "#ffffff" : "#000000", // Text color
            colorBgElevated: apperance.theme === "dark" ? "#2a2a2a" : "#e6f7ff", // Elevated background color
          },
        }}
      >
        <div className={`App ${isRTL ? "rtl" : ""}`}>
          <Routes>
            {/* Redirect root path to /en/home or /ar/home */}
            <Route
              path="/"
              element={<Navigate to={`/${i18nInstance.language}/home`} />}
            />

            {/* Main route with language-specific path */}
            <Route path="/:lang" element={<MainLayout />}>
              {renderRoutes(routes)} {/* Render other routes with children */}
            </Route>
          </Routes>
        </div>
      </ConfigProvider>
    </IntlProvider>
  );
}

export default App;
