// import React, { useEffect, useState } from "react";
// import Typography from "../../../components/common/typography/Index";
// import Divider from "../../../components/common/divider/Index";
// import Button from "../../../components/common/button/Index";
// import darkImg from "../../../assets/imges/dark.png";
// import lightImg from "../../../assets/imges/light.png";
// import deviceImg from "../../../assets/imges/device.png";
// import { useTheme } from "../../../hooks/useTheme";

// const lightColors = [
//   "#ff7f50", "#87cefa", "#da70d6", "#32cd32", "#ffa500",
//   "#ff69b4", "#4169e1", "#f0e68c", "#9370db", "#add8e6"
// ];

// const darkColors = [
//   "#8b0000", "#ff4500", "#ffa07a", "#ffd700", "#adff2f",
//   "#00fa9a", "#00ced1", "#1e90ff", "#6495ed", "#9370db"
// ];

// const Appearance = () => {
//   const [activeThemeSystem, setActiveThemeActive] = useState<"dark" | "light" | "device">("dark");
//   const [primaryColor, setPrimaryColor] = useState<string>("#5d46de");

//   const themesSystems = [
//     { title: "Dark", img: darkImg, id: "dark" },
//     { title: "Light", img: lightImg, id: "light" },
//     { title: "Device", img: deviceImg, id: "device" },
//   ];

//   const { makeTheme } = useTheme();

//   useEffect(() => {
//     // Check if user has a saved theme color
//     const storedColor = localStorage.getItem("primaryColor");
//     if (storedColor) {
//       setPrimaryColor(storedColor);
//       document.documentElement.style.setProperty("--light-primary-color", storedColor);
//       document.documentElement.style.setProperty("--dark-primary-color", storedColor);
//     }

//     // Check if "System default" is active and handle system theme detection
//     if (activeThemeSystem === "device") {
//       applySystemTheme();
//     }
//   }, [activeThemeSystem]);

//   const applySystemTheme = () => {
//     const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

//     if (darkModeMediaQuery.matches) {
//       makeTheme("dark");
//     } else {
//       makeTheme("light");
//     }

//     darkModeMediaQuery.addEventListener("change", (e) => {
//       const isDarkMode = e.matches;
//       if (isDarkMode) {
//         makeTheme("dark");
//       } else {
//         makeTheme("light");
//       }
//     });
//   };

//   const handleChangeTheme = (id: "dark" | "light" | "device") => {
//     setActiveThemeActive(id);
//     if (id === "light" || id === "dark") {
//       makeTheme(id);
//     } else if (id === "device") {
//       applySystemTheme();
//     }
//   };

//   const handleColorSelect = (color: string) => {
//     setPrimaryColor(color);
//     document.documentElement.style.setProperty("--light-primary-color", color);
//     document.documentElement.style.setProperty("--dark-primary-color", color);
//     localStorage.setItem("primaryColor", color);
//   };

//   const handleUpdateColors = () => {
//     document.documentElement.style.setProperty("--light-primary-color", primaryColor);
//     document.documentElement.style.setProperty("--dark-primary-color", primaryColor);
//     localStorage.setItem("primaryColor", primaryColor);
//   };

//   return (
//     <div className="appearance_page">
//       <div className="section">
//         <div className="section_title">
//           <Typography variant="h3">Appearance</Typography>
//           <Typography variant="body2" color="secondary">
//             Manage settings for your screen's appearance
//           </Typography>
//         </div>
//       </div>
//       <Divider color="secondary" thickness="2px" margin="25px 0" />
//       <div className="section">
//         <div className="section_title">
//           <Typography variant="h6">Theme</Typography>
//           <Typography variant="body2" color="secondary">
//             Manage settings for your UI appearance
//           </Typography>
//         </div>
//         <div className="themes">
//           {themesSystems.map((item) => (
//             <div
//               key={item.id}
//               onClick={() => handleChangeTheme(item.id as "dark" | "light" | "device")}
//               className={`theme_btn ${activeThemeSystem === item.id ? "active" : ""}`}
//               id={item.id}
//             >
//               <Button>
//                 <img src={item.img} alt={item.title} />
//               </Button>
//               <Typography
//                 color={`${item.id === activeThemeSystem ? "primary" : "secondary"}`}
//               >
//                 {item.title}
//               </Typography>
//             </div>
//           ))}
//         </div>
//         <Divider color="secondary" thickness="2px" margin="25px 0" />
//         <div className="section">
//           <div className="section_title">
//             <Typography variant="h6">Custom brand colors</Typography>
//             <Typography variant="body2" color="secondary">
//               Choose a brand color for your app pages
//             </Typography>
//           </div>
//           <div className="brand_colors">
//             <div className="brand_color light">
//               <Typography variant="body2">Brand Colors (Light Theme)</Typography>
//               <div className="color_palette">
//                 {lightColors.map((color) => (
//                   <div
//                     key={color}
//                     className="color_box"
//                     style={{ backgroundColor: color }}
//                     onClick={() => handleColorSelect(color)}
//                   />
//                 ))}
//               </div>
//             </div>
//             <div className="brand_color dark">
//               <Typography variant="body2">Brand Colors (Dark Theme)</Typography>
//               <div className="color_palette">
//                 {darkColors.map((color) => (
//                   <div
//                     key={color}
//                     className="color_box"
//                     style={{ backgroundColor: color }}
//                     onClick={() => handleColorSelect(color)}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//         <Divider color="secondary" thickness="2px" margin="25px 0" />
//         <div className="section update">
//           <Button variant="contained" onClick={handleUpdateColors}>Update</Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Appearance;

import{ useEffect, useState } from "react";
import Typography from "../../../components/common/typography/Index";
import Divider from "../../../components/common/divider/Index";
import Button from "../../../components/common/button/Index";
import darkImg from "../../../assets/imges/dark.png";
import lightImg from "../../../assets/imges/light.png";
import deviceImg from "../../../assets/imges/device.png";
import { useDispatch, useSelector } from "react-redux";
import {
  setApperance,
  setTheme,
} from "../../../features/settings/settingsSlice";
import { RootState } from "../../../app/store";

const lightColors = [
  "#ff7f50",
  "#87cefa",
  "#da70d6",
  "#32cd32",
  "#ffa500",
  "#ff69b4",
  "#4169e1",
  "#f0e68c",
  "#9370db",
  "#add8e6",
];

const darkColors = [
  "#8b0000",
  "#ff4500",
  "#ffa07a",
  "#ffd700",
  "#adff2f",
  "#00fa9a",
  "#00ced1",
  "#1e90ff",
  "#6495ed",
  "#9370db",
];

const Appearance = () => {
  const { theme, lightBrandColor, darkBrandColor } = useSelector(
    (state: RootState) => state.settings.apperance
  );
  const [activeThemeSystem, setActiveThemeActive] = useState<
    "dark" | "light" | "device"
  >(theme);
  const [darkPrimaryColor, setDarkPrimaryColor] =
    useState<string>(darkBrandColor);
  const [lightPrimaryColor, setLightPrimaryColor] =
    useState<string>(lightBrandColor);
  const dispatch = useDispatch();
  const themesSystems = [
    { title: "Dark", img: darkImg, id: "dark" },
    { title: "Light", img: lightImg, id: "light" },
    { title: "Device", img: deviceImg, id: "device" },
  ];

  useEffect(() => {
    // Check if user has a saved light or dark theme color
    const storedLightColor = localStorage.getItem("lightPrimaryColor");
    const storedDarkColor = localStorage.getItem("darkPrimaryColor");

    if (storedLightColor) {
      setLightPrimaryColor(storedLightColor);
    }

    if (storedDarkColor) {
      setDarkPrimaryColor(storedDarkColor);
    }

    // Check if "System default" is active and handle system theme detection
    if (activeThemeSystem === "device") {
      applySystemTheme();
    }
  }, [activeThemeSystem]);

  const applySystemTheme = () => {
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    if (darkModeMediaQuery.matches) {
      dispatch(setTheme("dark"));
    } else {
      dispatch(setTheme("light"));
    }

    darkModeMediaQuery.addEventListener("change", (e) => {
      const isDarkMode = e.matches;
      if (isDarkMode) {
        dispatch(setTheme("dark"));
      } else {
        dispatch(setTheme("light"));
      }
    });
  };

  const handleChangeTheme = (id: "dark" | "light" | "device") => {
    setActiveThemeActive(id);
    if (id === "light" || id === "dark") {
      dispatch(setTheme(id));
    } else if (id === "device") {
      applySystemTheme();
    }
  };

  const handleLightColorSelect = (color: string) => {
    setLightPrimaryColor(color);
  };

  const handleDarkColorSelect = (color: string) => {
    setDarkPrimaryColor(color);
  };

  const handleUpdateColors = () => {
    // Apply the selected primary colors
    const updatedApperance = {
      theme,
      darkBrandColor: darkPrimaryColor,
      lightBrandColor: lightPrimaryColor,
    };
    dispatch(setApperance(updatedApperance));
    document.documentElement.style.setProperty(
      "--light-primary-color",
      lightPrimaryColor
    );

    document.documentElement.style.setProperty(
      "--dark-primary-color",
      darkPrimaryColor
    );

    // Save the selected colors to local storage
    localStorage.setItem("lightPrimaryColor", lightPrimaryColor);
    localStorage.setItem("darkPrimaryColor", darkPrimaryColor);
  };

  return (
    <div className="appearance_page">
      <div className="section">
        <div className="section_title">
          <Typography variant="h3">Appearance</Typography>
          <Typography variant="body2" color="secondary">
            Manage settings for your screen's appearance
          </Typography>
        </div>
      </div>
      <Divider color="secondary" thickness="2px" margin="25px 0" />
      <div className="section">
        <div className="section_title">
          <Typography variant="h6">Theme</Typography>
          <Typography variant="body2" color="secondary">
            Manage settings for your UI appearance
          </Typography>
        </div>
        <div className="themes">
          {themesSystems.map((item) => (
            <div
              key={item.id}
              onClick={() =>
                handleChangeTheme(item.id as "dark" | "light" | "device")
              }
              className={`theme_btn ${
                activeThemeSystem === item.id ? "active" : ""
              }`}
              id={item.id}
            >
              <Button>
                <img src={item.img} alt={item.title} />
              </Button>
              <Typography
                color={`${
                  item.id === activeThemeSystem ? "primary" : "secondary"
                }`}
              >
                {item.title}
              </Typography>
            </div>
          ))}
        </div>
        <Divider color="secondary" thickness="2px" margin="25px 0" />
        <div className="section">
          <div className="section_title">
            <Typography variant="h6">Custom brand colors</Typography>
            <Typography variant="body2" color="secondary">
              Choose a brand color for your app pages
            </Typography>
          </div>
          <div className="brand_colors">
            <div className="brand_color">
              <Typography variant="body2">
                Brand Colors (Light Theme)
              </Typography>
              <div className="color_palette">
                {lightColors.map((color) => (
                  <div
                    key={color}
                    className={`color_box ${
                      lightPrimaryColor === color ? "selected" : ""
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleLightColorSelect(color)}
                  />
                ))}
              </div>
            </div>
            <div className="brand_color">
              <Typography variant="body2">Brand Colors (Dark Theme)</Typography>
              <div className="color_palette">
                {darkColors.map((color) => (
                  <div
                    key={color}
                    className={`color_box ${
                      darkPrimaryColor === color ? "selected" : ""
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleDarkColorSelect(color)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <Divider color="secondary" thickness="2px" margin="25px 0" />
        <div className="section update">
          <Button variant="contained" onClick={handleUpdateColors}>
            Update
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Appearance;
