import React, { useState, useContext } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchedQuestions from "./SearchedQuestions";
import { ThemeContext } from '../ThemeContext';
import ThemeToggleButton from "./ThemeToggleButton";

function SearchBar() {
  const { Night } = useContext(ThemeContext);
    
  const [questions, setQuestions] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false); 

  const searchQuestions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/questions`, {
        params: { query },
      });
      setQuestions(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="container mt-5" style={{ color: Night ? 'white' : 'black' }}>
      <h1 className="text-center">Question Search</h1>
      <div className="form d-flex justify-content-center align-items-center">
        <input
          type="text"
          className="form-control"
          style={{ width: '700px' }} 
          placeholder="Search questions by title"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        /> 

        <button className="btn btn-primary ml-2" onClick={searchQuestions}>
          Search
        </button>
        ' '
        <ThemeToggleButton className="Theme toggle button ml-3" /> 
      </div>
      <div className="mt-5">
        {loading ? (
          <div className="text-center">
            <p>Loading...</p>
          </div>
        ) : (
          <SearchedQuestions questions={questions} />
        )}
      </div>
    </div>
  );
}

export default SearchBar;