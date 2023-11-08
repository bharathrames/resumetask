import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const WorkExperience = ({ backgroundColor, onDragEnd }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://resumebackend-five.vercel.app/api/work-experience')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching work experience data:', error));
  }, []);

  return (
    <div style={{ backgroundColor }} className="resume-section">
    <h2>Work Experience</h2>
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="work-experien">
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
                    <strong>{item.position}</strong> at {item.company}
                    <p>
                      {item.startDate} - {item.endDate ? item.endDate : 'Present'}
                    </p>
                    <p>{item.description}</p>
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

export default WorkExperience;
