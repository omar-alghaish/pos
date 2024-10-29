// import React, { createContext, useState, useContext, useEffect } from 'react';

// interface ThemeContextType {
//   theme: 'light' | 'dark';
//   toggleTheme: () => void;
//   makeTheme: (theme: 'light' | 'dark') =>void;
// }

// const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [theme, setTheme] = useState<'light' | 'dark'>(() => {
//     // Get saved theme from localStorage or default to 'light'
//     return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
//   });

//   useEffect(() => {
//     document.body.className = theme; // Apply theme class to body element
//     localStorage.setItem('theme', theme); // Save theme to localStorage
//   }, [theme]);

//   const toggleTheme = () => {
//     setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
//   };

//   const makeTheme = (theme: 'light' | 'dark') => {
//     setTheme(theme);
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme, makeTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = () => {
//   const context = useContext(ThemeContext);
//   if (!context) {
//     throw new Error('useTheme must be used within a ThemeProvider');
//   }
//   return context;
// };
