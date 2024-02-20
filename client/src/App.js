// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import CSS file for styles

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  if (data === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app-container">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default App;