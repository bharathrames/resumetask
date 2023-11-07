import React, { useState } from 'react';
import './App.css';
import WorkExperience from './components/WorkExperience';
import Education from './components/Education';

function App() {
  const [backgroundColor, setBackgroundColor] = useState('white'); 
  
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    // Reorder sections based on drag-and-drop
    if (result.destination.droppableId === 'work-experience') {
      // You may need to update the order of sections on the server.
    }
  };

  const handleColorChange = (event) => {
    setBackgroundColor(event.target.value);
  };

  return (
    <div className="App">
      <h1>Resume Data</h1>
      <div className="color-picker">
        <label htmlFor="color">Select Background Color: </label>
        <select id="color" value={backgroundColor} onChange={handleColorChange} className="custom-select">
          <option value="white">White </option>
          <option value="lightgrey">Light Grey</option>
          <option value="lightblue">Light Blue</option>
        </select>
      </div>
      <Education backgroundColor={backgroundColor} onDragEnd={handleDragEnd} />
      <WorkExperience backgroundColor={backgroundColor} onDragEnd={handleDragEnd} />
    </div>
  );
}

export default App;
