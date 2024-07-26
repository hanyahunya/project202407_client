import React from 'react';

const Tasks = ({ projectId }) => {
  localStorage.setItem('prevPage', projectId);
  // Use projectId to fetch tasks specific to the selected project
  return (
    <div>
      <h2>Tasks for Project {projectId}</h2>
      {/* Render tasks specific to the projectId */}
    </div>
  );
};

export default Tasks;
