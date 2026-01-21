import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: light)").matches
    );

    useEffect(() => {
        document.body.style.background = darkMode ? "#1e1e1e" : "#f5f5f5";
        document.body.style.color = darkMode ? "#e0e0e0" : "#121212";
    }, [darkMode]);

    const toggleDarkMode = () => setDarkMode((prev) => !prev);

    return (
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};
