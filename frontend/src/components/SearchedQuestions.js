import React from 'react';
import './SearchedQuestions.css'; 
import { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import { VariableSizeList as List } from 'react-window';


const SearchedQuestions = ({ questions }) => {
  const { Night } = useContext(ThemeContext);
  
  const mcqs = questions.filter(q => q.type === 'MCQ');
  const others = questions.filter(q => q.type === 'CONTENT_ONLY' || q.type === 'READ_ALONG');
  const anagram = questions.filter(q => q.type === 'ANAGRAM');

  const getAnagramItemSize = index => {
    const q = anagram[index];
    return 100 + (q.blocks.length * 30); 
  };
  

  const AnagramRow = ({ index, style }) => {
    const q = anagram[index];
    return (
      <div style={style} key={q._id}>
        <strong>Q. {q.title}</strong>
        <div className="mcq-options">
          <ul>
            {q.blocks.map((opt, i) => (
              <li key={i}>
                {i + 1}) {opt.text}
              </li>
            ))}
          </ul>
          <select id={`answer-${q._id}`} name={`answer-${q._id}`} style={{ width: '100px' }}>
            <option value="">Answer</option>
            <option value={q.solution}>
              {q.solution}
            </option>
          </select>
        </div>
      </div>
    );
  };
  return (
    <div className="questions-container">
      <div className="mcqs-section" style={{ background: Night ? 'rgba(29, 28, 28, 0.82)' : 'rgba(254, 251, 251, 0.7)', color: Night ? 'white' : 'black' }}>
  <h2>Multiple Choice Questions (MCQs)</h2>
  {mcqs.length > 0 ? (
    <ul>
      {mcqs.map((q) => (
        <li key={q._id}>
          <strong>Q. {q.title}</strong>
          <div className="mcq-options">
            <ul>
              {q.options.map((opt, i) => (
                <li key={i}>
                  {i + 1}) {opt.text}
                </li>
              ))}
            </ul>
            <select id={`answer-${q._id}`} name={`answer-${q._id}`} style={{ width: '100px' }}>
              <option value="">Answer</option>
              {q.options
                .filter(opt => opt.isCorrectAnswer)
                .map((opt, i) => (
                  <option key={i} value={opt.text}>
                    {opt.text}
                  </option>
                ))}
            </select>
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <p>No MCQs found.</p>
  )}
</div>
        
     

      <div className="others-section" style={{ background: Night ? 'rgba(29, 28, 28, 0.82)' : 'rgba(254, 251, 251, 0.7)', color: Night ? 'white' : 'black' }}>
        <h2>Other Questions</h2>
        {anagram.length > 0 ? (
      <List
        height={500} 
        itemCount={anagram.length} 
        itemSize={getAnagramItemSize}
        width="100%" 
      >
        {AnagramRow}
      </List>
    ) : (
      <p>No ANAGRAM found.</p>
    )}
        {others.length > 0 ? (
          <ul>
            {others.map((q) => (
              <li key={q._id}>
                <strong>Q. {q.title}</strong> ({q.type})<br /><br />
              </li>
            ))}
          </ul>
        ) : (
          <p>No other questions found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchedQuestions;