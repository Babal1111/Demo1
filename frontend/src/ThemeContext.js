import React, { createContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [Night, setNight] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('Night') === 'true';
    setNight(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = !Night;
    setNight(newTheme);
    localStorage.setItem('Night', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ Night, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };