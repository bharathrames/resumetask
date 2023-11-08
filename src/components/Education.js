import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Education = ({ backgroundColor, onDragEnd }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://resumebackend-five.vercel.app/api/education')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching education data:', error));
  }, []);

  return (
    <div style={{ backgroundColor }} className="resume-section">
    <h2>Education</h2>
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="education-ids">
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {data.map((item, index) => (
              <Draggable key={item._id} draggableId={item._id} index={index}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <strong>{item.degree}</strong> at {item.college}
                    <p>Graduated: {item.graduationDate}</p>
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  </div>
  );
};

export default Education;
