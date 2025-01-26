import "bootstrap/dist/css/bootstrap.min.css";
import bg from "./image/bg.png";
import dark from "./image/dark2.png";
import SearchBar from "./components/SearchBar";
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext.js';
// import ThemeToggleButton from './components/ThemeToggleButton';

function App() {
  const { Night } = useContext(ThemeContext);

  return (
    <>
      <div
        style={{
          backgroundImage: Night ? `url(${dark})` : `url(${bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          minHeight: '100vh',
          minWidth: '100vw',
          position: 'relative',
          margin: 0,
          padding: 0,
          color: Night ? '' : '', 
        }}
      >
        <div>.</div>
        <SearchBar />
      </div>
    </>
  );
}

export default App;