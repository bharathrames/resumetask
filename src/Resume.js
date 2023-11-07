// Resume.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Resume = () => {
  const [education, setEducation] = useState([]);
  const [workExperience, setWorkExperience] = useState([]);
  const [backgroundColor, setBackgroundColor] = useState('white');

  useEffect(() => {
    // Fetch data from the backend API
    axios.get('/api/education')
      .then((response) => {
        setEducation(response.data);
      })
      .catch((error) => {
        console.error('Error fetching education data:', error);
      });

    axios.get('/api/work-experience')
      .then((response) => {
        setWorkExperience(response.data);
      })
      .catch((error) => {
        console.error('Error fetching work experience data:', error);
      });
  }, []);

  // Handle drag-and-drop reordering
  const handleDragEnd = (result) => {
    // Implement the reordering logic and update the state accordingly
  };

  return (
    <div>
      <h1>Resume</h1>

      {/* Color selection */}
      <div>
        <label>Select a color:</label>
        <select value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)}>
          <option value="white">White</option>
          <option value="lightgrey">Light Grey</option>
          <option value="lightblue">Light Blue</option>
        </select>
      </div>

      {/* Resume sections */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="sections">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{ backgroundColor: backgroundColor }}
            >
              {education.map((item, index) => (
                <Draggable key={item._id} draggableId={item._id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {/* Display education data */}
                    </div>
                  )}
                </Draggable>
              ))}
              {workExperience.map((item, index) => (
                <Draggable key={item._id} draggableId={item._id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {/* Display work experience data */}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Resume;
