import React from "react";
import { useLocation } from "react-router-dom";

const Debug = ({ history }) => {
  const location = useLocation();

  return (
    <div>
      <h2>Debug</h2>
      <p>Поточний шлях: {location.pathname}</p>
      <p>Історія перебування:</p>
      <ul>
        {history.map((entry, index) => (
          <li key={index}>{entry}</li>
        ))}
      </ul>
    </div>
  );
};

export default Debug;
