import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';

const ThemeToggleButton = () => {
  const { Night, toggleTheme } = useContext(ThemeContext);

  return (
    <diV className="mt-10 " style={{}} >
    <button className="btn btn-secondary mt-7 ml-5" style={{backgroundColor:Night ? 'grey' : 'rgba(254, 251, 251, 0.9)',color:Night ? 'white' : 'black'}} onClick={toggleTheme}>
      {Night ? 'Night' : 'Day'} Theme
    </button></diV>
  );
};

export default ThemeToggleButton;